// ========== УНІВЕРСАЛЬНИЙ GOOGLE APPS SCRIPT ==========
// Цей скрипт підтримує всі формати відправки даних з усіх ваших лендингів.
// Він автоматично створює нові стовпці у Google Таблиці, якщо приходять нові поля,
// і коректно обробляє відповіді для платежів WayForPay.

var ILONA_MERCHANT_ACCOUNT = 'freelance_user_688267859900c';
var ILONA_MERCHANT_DOMAIN = 'freelance';
var ILONA_SECRET_KEY = 'a1d150e3620582a3f43a88d65e7633710d75caba';

// ЗАМІНІТЬ це посилання на нове посилання ВАШОГО розгорнутого вебдодатку
var ILONA_SERVICE_URL = 'https://script.google.com/macros/s/AKfycbzQFF2jg87YSoQoh6YchHNuTY22BADTnhCzSSrbIPIZpHdi9DTt5QiD58wQW0F24bBHBw/exec';

// СТАНДАРТНІ ЗАГОЛОВКИ (Gold Standard)
// --- ДОДАНО "Країна" для нового сайту ---
var STANDARD_HEADERS =["Дата", "Ім'я", "Телефон", "Telegram", "Країна", "Ціна", "Статус оплати", "Дата оплати", "Сума оплати", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term", "Order ID"];

// МАПА ПОЛІВ (допомагає звести різні назви з сайтів до одного стандарту)
var FIELD_MAPPING = {
  "name": "Ім'я",
  "phone": "Телефон",
  "full_phone": "Телефон",
  "telegram": "Telegram",
  "country": "Країна", // --- ДОДАНО ---
  "amount": "Ціна",
  "price": "Ціна",
  "sheetName": "Лендинг",
  "sheet_name": "Лендинг",
  "utm_source": "UTM Source",
  "utm_medium": "UTM Medium",
  "utm_campaign": "UTM Campaign",
  "utm_content": "UTM Content",
  "utm_term": "UTM Term",
  "campaign_name": "UTM Campaign",
  "adset_name": "UTM Medium",
  "ad_name": "UTM Content"
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); 

  try {
    var rawContent = e.postData ? (e.postData.contents || '') : '';
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Логуємо абсолютно всі сирі дані (для перевірки та дебагу)
    logDebugData(rawContent, doc);
    
    var data = null;
    var isWFPWebhook = false;
    
    // 2. Аналіз формату вхідних даних
    try {
      if (rawContent) {
        data = JSON.parse(rawContent);
        // Перевірка чи це Webhook від WayForPay
        if (data.transactionStatus !== undefined && data.orderReference !== undefined) {
          isWFPWebhook = true;
        }
      }
    } catch (err) {
      // Якщо це не JSON, значить це стандартний POST форми (e.parameter)
    }
    
    if (!data) {
       data = e.parameter || {}; // Беремо параметри з Форми, якщо не JSON
    }
    
    // --- ВАЖЛИВО: Нормалізація назви листа (виправляємо баги роутингу) ---
    var oName = data.sheetName || data.sheet_name;
    
    if (oName === "leads VSL" || oName === "leads_VSL") {
      // ПРОБЛЕМА БУЛА ТУТ: Повертаю leads VSL на "урок" (я помилково кинув на Практикум)
      data.sheetName = "урок";
      data.sheet_name = "урок";
    } else if (!oName || oName === "Вхідні Заявки" || oName === "Вхідні заявки" || oName === "Leads_Challenge" || oName === "ilonaprctcm") {
      // Новий лендинг приходить порожнім або як "Вхідні заявки". Направляємо в Практикум.
      data.sheetName = "Практикум";
      data.sheet_name = "Практикум";
    }
    
    // Якщо щось піде не по плану (у Неопределенное), прокидуємо URL
    var lUrl = data.url || data.page_url || data.referer || data.source_url || "";
    if (lUrl) {
      data["URL лендингу"] = lUrl;
    }
    
    // 3. Обробка Webhook від WayForPay (Автоматична зміна статусу оплати)
    if (isWFPWebhook) {
      return handleWayForPayWebhook(data, doc);
    }
    
    // 4. Генерація платежу WayForPay (якщо запит прийшов з old2.gs сторінки)
    if (data.action === 'ilona_paid' || (data.amount && data.return_url)) {
      return handlePaymentRequest(data, doc);
    }
    
    // 5. Стандартна відправка інформації з усіх інших лендингів (Фокус Кохання, Group etc.)
    var importantFieldsExist = data.name || data.phone || data.full_phone || data.email || data.telegram;
    
    if (importantFieldsExist) {
        
      // Назва листа куди будуть додаватись запити
      var sheetName = data.sheetName || data.sheet_name;
      
      // "Если вдруг что-то пойдет не по плану, хай создает лист Неопределенное"
      if (!sheetName) {
        sheetName = 'Неопределенное';
      }
      
      var dataObj = flattenData(data);
      
      // --- ЗМІНА: Використовуємо відповідну логіку для специфічних листів ---
      if (sheetName === "Платний аудит 2.0") {
        saveToSheetStrictly(doc, sheetName, dataObj);
      } else {
        // Для Практикуму, Уроку та всіх інших листів зберігаємо оригінальну круту "розгорнуту" логіку, 
        // яка сама чудово співставить колонки як треба.
        saveToSheetDynamically(doc, sheetName, dataObj);
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        "status": "success", 
        "received_sheet": sheetName
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({"status": "empty_data_or_ignored"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Функція яка розплющує об'єкти щоб уникати помилок масивів та об'єктів у клітинках таблиці
function flattenData(data) {
  var result = {};
  for (var key in data) {
    if (typeof data[key] !== 'object' && typeof data[key] !== 'function') {
      result[key] = data[key];
    }
  }
  return result;
}

// --- НОВА ФУНКЦІЯ: Тільки для "Платний аудит 2.0" (чистий візуал, без сміттєвих колонок) ---
function saveToSheetStrictly(doc, sheetName, dataObject) {
  var sheet = doc.getSheetByName(sheetName);
  
  // Якщо листа немає, створюємо його і додаємо заголовки ТІЛЬКИ ОДИН РАЗ
  if (!sheet) {
    sheet = doc.insertSheet(sheetName);
    sheet.appendRow(STANDARD_HEADERS);
    sheet.getRange(1, 1, 1, STANDARD_HEADERS.length).setFontWeight("bold").setBackground("#f3f3f3");
    sheet.setFrozenRows(1); // Фіксуємо верхній рядок
  } else if (sheet.getLastRow() === 0) {
    // Якщо лист є, але порожній
    sheet.appendRow(STANDARD_HEADERS);
    sheet.getRange(1, 1, 1, STANDARD_HEADERS.length).setFontWeight("bold").setBackground("#f3f3f3");
    sheet.setFrozenRows(1);
  }

  // Підготовка даних (Мапінг)
  var mappedData = {
    "Дата": Utilities.formatDate(new Date(), "GMT+2", "dd.MM.yyyy HH:mm:ss")
  };
  
  for (var key in dataObject) {
    var standardKey = FIELD_MAPPING[key] || key;
    mappedData[standardKey] = dataObject[key];
  }

  // Формування рядка строго по порядку STANDARD_HEADERS
  var rowData =[];
  for (var i = 0; i < STANDARD_HEADERS.length; i++) {
    var header = STANDARD_HEADERS[i];
    var val = mappedData[header] !== undefined ? mappedData[header].toString() : "";
    
    // Захист для телефону
    if (header === "Телефон" && val !== "" && !val.startsWith("'")) {
      val = "'" + val;
    }
    rowData.push(val);
  }
  
  // Записуємо готовий рядок
  sheet.appendRow(rowData);
}



// ========== ДИНАМІЧНЕ ДОДАВАННЯ СТОВПЦІВ ТА ЗАПИС (ТВОЯ ОРИГІНАЛЬНА ЛОГІКА ДЛЯ ІНШИХ СТОРІНОК) ==========
function saveToSheetDynamically(doc, sheetName, dataObject) {
  var sheet;
  if (sheetName === "Практикум") {
    // Жорстка прив'язка до GID Практикуму (ні в якому разі не прив'язувати сюди урок)
    sheet = getSheetByGidOrName(doc, 1217591980, sheetName);
  } else {
    sheet = doc.getSheetByName(sheetName);
  }
              
  if (!sheet) {
    sheet = doc.insertSheet(sheetName);
  }
  
  // КРОК 1: Перевірка на "Крупне Оновлення"
  var lastRow = sheet.getLastRow();
  var needsUpdateHeader = false;
  
  if (lastRow > 0) {
    var allData = sheet.getDataRange().getValues();
    var foundOrderId = false;
    
    // Шукаємо найсвіжіший рядок із заголовками (знизу вверх)
    for (var i = allData.length - 1; i >= 0; i--) {
      if (allData[i].indexOf("Order ID") !== -1) {
        foundOrderId = true;
        break;
      } else if (allData[i].indexOf("Дата") !== -1) {
        break; // Знайшли заголовки, але серед них немає Order ID
      }
    }
    
    if (!foundOrderId) {
      needsUpdateHeader = true;
    }
  } else {
    needsUpdateHeader = true;
  }

  if (needsUpdateHeader) {
    if (lastRow > 0) sheet.appendRow([""]);
    var updateNote = "🚀 КРУПНЕ ОНОВЛЕННЯ СИСТЕМИ (" + Utilities.formatDate(new Date(), "GMT+2", "dd.MM.yyyy HH:mm") + ")";
    sheet.appendRow([updateNote]);
    var lastRowIdx = sheet.getLastRow();
    sheet.getRange(lastRowIdx, 1, 1, STANDARD_HEADERS.length).merge().setBackground("#ffebee").setFontWeight("bold").setHorizontalAlignment("center");
    sheet.appendRow(STANDARD_HEADERS);
    sheet.getRange(sheet.getLastRow(), 1, 1, STANDARD_HEADERS.length).setBackground("#f3f3f3").setFontWeight("bold");
  }

  // КРОК 2: Підготовка даних (Мапінг)
  var mappedData = {
    "Дата": Utilities.formatDate(new Date(), "GMT+2", "dd.MM.yyyy HH:mm:ss")
  };
  
  for (var key in dataObject) {
    var standardKey = FIELD_MAPPING[key] || key;
    mappedData[standardKey] = dataObject[key];
  }

  // КРОК 3: Визначення поточних заголовків
  var headerRowIdx = 1;
  var allData = sheet.getDataRange().getValues();
  for (var i = allData.length - 1; i >= 0; i--) {
    if (allData[i].indexOf("Order ID") !== -1 || allData[i].indexOf("Дата") !== -1) {
      headerRowIdx = i + 1;
      break;
    }
  }
  
  var headers = sheet.getRange(headerRowIdx, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // КРОК 4: Формування рядка для запису
  var rowData =[];
  for (var k = 0; k < headers.length; k++) {
    var h = headers[k];
    if (!h) { rowData.push(""); continue; }
    
    // --- ДОДАНО МАЛЕНЬКИЙ ЗАХИСТ В ОРИГІНАЛ ДЛЯ ТЕЛЕФОНІВ ---
    var val = mappedData[h] !== undefined ? mappedData[h].toString() : "";
    if (h === "Телефон" && val !== "" && !val.startsWith("'")) {
        val = "'" + val;
    }
    rowData.push(val);
  }
  
  // Додаємо нові стовпці, якщо сайт прислав те, чого немає в заголовках
  for (var mKey in mappedData) {
    if (headers.indexOf(mKey) === -1 && mKey !== "") {
      sheet.getRange(headerRowIdx, headers.length + 1).setValue(mKey).setFontWeight("bold");
      headers.push(mKey);
      rowData.push(mappedData[mKey].toString());
    }
  }
  
  sheet.appendRow(rowData);
}

// ========== СТВОРЕННЯ ЗАПИТУ ДО WAYFORPAY ==========
function handlePaymentRequest(data, doc) {
  var sheetName = data.sheetName || data.sheet_name || 'Платний аудіт';
  var name = data.name || '';
  var telegram = data.telegram || '';
  var phone = data.full_phone || data.phone || '';
  var amount = data.amount || data.price || '390'; 
  var currency = data.currency || 'UAH';
  var returnUrl = data.return_url || 'https://fokuskohannia.vercel.app/thanks.html';
  
  // --- ЗМІНА: Пріоритет беремо UID з сайту ---
  var orderId = data["Order ID"] || data.orderReference || data.uid || ('ILONA_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2, 5));
  
  var dataObj = flattenData(data);
  dataObj["Order ID"] = orderId;
  dataObj["Статус оплати"] = "Очікування";
  
  // --- ЗМІНА: Використовуємо правильну функцію збереження залежно від листа ---
  if (sheetName === "Платний аудит 2.0") {
      saveToSheetStrictly(doc, sheetName, dataObj);
  } else {
      saveToSheetDynamically(doc, sheetName, dataObj);
  }
  
  var paymentData = createIlonaPayment(orderId, amount, currency, name, phone, returnUrl);
  
  return ContentService.createTextOutput(JSON.stringify({
    "result": "success",
    "paymentData": paymentData,
    "orderId": orderId
  })).setMimeType(ContentService.MimeType.JSON);
}

function createIlonaPayment(orderId, amount, currency, name, phone, returnUrl) {
  var orderDate = Math.floor(Date.now() / 1000);
  var productName = 'Персональна діагностика';
  var productCount = 1;
  var productPrice = parseInt(amount);
  
  // Якщо ціна подана текстом типу "290 грн", дістаємо самі цифри
  var amtMatch = amount.toString().match(/\d+/);
  if (amtMatch) {
      productPrice = parseInt(amtMatch[0]);
  }
  
  var signString = ILONA_MERCHANT_ACCOUNT + ';' + 
                   ILONA_MERCHANT_DOMAIN + ';' + 
                   orderId + ';' + 
                   orderDate + ';' + 
                   productPrice + ';' + 
                   currency + ';' + 
                   productName + ';' + 
                   productCount + ';' + 
                   productPrice;
  
  var signatureBytes = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_MD5, signString, ILONA_SECRET_KEY);
  var signatureHex = signatureBytes.map(function(b) {
    return ('0' + (b & 0xFF).toString(16)).slice(-2);
  }).join('');
  
  return {
    merchantAccount: ILONA_MERCHANT_ACCOUNT,
    merchantDomainName: ILONA_MERCHANT_DOMAIN,
    orderReference: orderId,
    orderDate: orderDate,
    amount: productPrice,
    currency: currency,
    productName: productName,
    productCount: productCount,
    productPrice: productPrice,
    merchantSignature: signatureHex,
    returnUrl: returnUrl,
    serviceUrl: ILONA_SERVICE_URL,
    clientFirstName: name,
    clientPhone: phone
  };
}

// ========== WAYFORPAY WEBHOOK / ПІДТВЕРДЖЕННЯ ==========
function handleWayForPayWebhook(json, doc) {
  var logSheet = doc.getSheetByName("WFP_Log");
  if (!logSheet) {
    logSheet = doc.insertSheet("WFP_Log");
    logSheet.appendRow(['Дата', 'Статус', 'OrderRef', 'Телефон', 'Сума']);
  }
  
  var orderRef = json.orderReference || '';
  
  logSheet.appendRow([
    Utilities.formatDate(new Date(), "GMT+2", "dd.MM.yyyy HH:mm:ss"),
    json.transactionStatus || '',
    orderRef,
    json.phone || '',
    json.amount || ''
  ]);
  
  // Шукаємо лід з таким OrderRef по всім листам
  var sheets = doc.getSheets();
  for (var i = 0; i < sheets.length; i++) {
     var sh = sheets[i];
     var n = sh.getName();
     if (n === "DEBUG_LOG" || n === "WFP_Log") continue;
     
     var rangeData = sh.getDataRange().getValues();
     if (rangeData.length === 0) continue;
     
     // Шукаємо, де заголовки
     var headerRowIdx = 0;
     for(var r=0; r < Math.min(rangeData.length, 5); r++){
         if(rangeData[r].indexOf("Order ID") !== -1) {
             headerRowIdx = r;
             break;
         }
     }

     var headers = rangeData[headerRowIdx];
     var orderIdx = headers.indexOf("Order ID");
     
     if (orderIdx !== -1) {
       for (var r = headerRowIdx + 1; r < rangeData.length; r++) {
         if (rangeData[r][orderIdx] === orderRef) {
           updateCell(sh, r + 1, headers, "Статус оплати", json.transactionStatus);
           
           if (json.transactionStatus === 'Approved') {
             updateCell(sh, r + 1, headers, "Дата оплати", Utilities.formatDate(new Date(), "GMT+2", "dd.MM.yyyy HH:mm:ss"));
             updateCell(sh, r + 1, headers, "Сума оплати", json.amount + ' ' + (json.currency || ''));
           }
           break;
         }
       }
     }
  }
  
  return sendIlonaWayForPayResponse(json);
}

// Допоміжна функція оновлення клітинки за іменем стовпця (якщо немає - створює)
function updateCell(sheet, rowNum, headersArr, colName, value) {
  var idx = headersArr.indexOf(colName);
  if (idx === -1) {
    headersArr.push(colName);
    sheet.getRange(1, headersArr.length).setValue(colName);
    sheet.getRange(1, headersArr.length).setFontWeight("bold");
    idx = headersArr.length - 1;
  }
  sheet.getRange(rowNum, idx + 1).setValue(value);
}

function sendIlonaWayForPayResponse(json) {
  var responseTime = Math.floor(Date.now() / 1000);
  var signString = json.orderReference + ';accept;' + responseTime;
  var signatureBytes = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_MD5, signString, ILONA_SECRET_KEY);
  var signatureHex = signatureBytes.map(function(b) {
    return ('0' + (b & 0xFF).toString(16)).slice(-2);
  }).join('');
  
  return ContentService.createTextOutput(JSON.stringify({
    orderReference: json.orderReference,
    status: 'accept',
    time: responseTime,
    signature: signatureHex
  })).setMimeType(ContentService.MimeType.JSON);
}

// ========== ЛОГУВАННЯ СИРИХ ДАНИХ (ДЕБАГ) ==========
function logDebugData(rawContent, ss) {
  var logSheet = ss.getSheetByName("DEBUG_LOG");
  if (!logSheet) {
    logSheet = ss.insertSheet("DEBUG_LOG");
    logSheet.appendRow(["Час", "Сирі дані"]);
  }
  var timestamp = Utilities.formatDate(new Date(), "GMT+2", "dd.MM.yyyy HH:mm:ss");
  logSheet.appendRow([timestamp, rawContent]);
}

// Допоміжна функція для отримання листа за GID або ім'ям
function getSheetByGidOrName(doc, gid, fallbackName) {
  var sheets = doc.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() == gid) {
      return sheets[i];
    }
  }
  return doc.getSheetByName(fallbackName);
}

function doGet(e) {
  return ContentService.createTextOutput('Google Apps Script Server is Active').setMimeType(ContentService.MimeType.TEXT);
}