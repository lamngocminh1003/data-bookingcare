import moment from "moment";
require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVjj9dQMwhMdlI\nuvj/rb1LfJMlSWJvFD1YAUCvItW0yi/OF8+ey+Ns1QrC+eg81E3+zCbb7Zw+XfZN\nwVCJ649Ihr6kBjjw/dFLUkEuzDQSky9/aoggu4sS5h4nuXZJ/PuQ8vr0F7RnrgwA\n7uhSA2RKtOZ/PW3xpuUapqcNIsUuKJTsBlHSf5BBv2JbrI8+lXk4GyIy6yLKs7yh\nD8jvETepPfLme6kzSu0PDqWbIXQdsXt1/4RZ2H5WUmcCNgs4tKemaIiYnnaqIml7\nIZIyo8Usy3Kek63+EzaVjjHZ5bpPPnEwyX0hXIDh8Q/ZVkG+BAZ7NhjsU/atZqRT\nJh7TPFbDAgMBAAECggEAFx3GvIbB++raaiwARcuDLqehj4oGws2ZkmtAe3GXylsq\nxXZtEIn07AMH/U18cJPjlFvWMSNKhbdSAABpOaWP3vF428iHGkouhK/A7yyqwH5A\nlrdkNXms4ZhxFnR2Ygb46WrX5aJuWkzkLRbAZmuAyoKoqAfaNm0KDN2v2iTC3piJ\nqHPzHZGco42/Y9fM6VKmQBzHEGjl5Kib+6+zkzastazHKaXyXPtlEAPrDLfBx/vz\no+beyOEQscGhHrTdJsKXLIwlq5S0lItUk0Q/UEUs/xMUd1Hw+IGzb0oOqZ+nSQFG\nFjgpeG75YU6Fz/LlAZgiT7xcL1DsFtQjvGEDMWuxpQKBgQDMx/Pd0RKRUX+rL918\nLn7i5f5aTXtV76OF+ySs7kGPgAAIyq5BGiJEgn5hHusGvXLGnuA2LSz0hnslshgq\nlJ8yyAR0SUCOjdkx8HwmNp6IRFd90iAbRnF/Bt07iwj7JbbOND0wZ3cV1E4qJfht\nqx27+ZVh6SywHNeHyiHLDX7EPQKBgQC69jwNm42iKlfpGhR+fqa06geKIZfbX3vW\nsRRmuL3374RXyUdJ11k4rl6QgyIxYxUHqPVt6fTB7r+kROi2mATP+6bhTBOBopZX\n/yVIbBjrAQHCjnMAWRs2jZaCBfhd8y1Lt/mUN8kGlP2kMlcCpnM9K5kTjJ8RGH2g\nOxOLFfo2/wKBgAi3wnQBAI9bLto00XMF77TtIaTqg4OnDgkYJfmOsw/O3TGCn2R6\nHldYTtUHoe3JhudZwCXOSommZ/u01z6I0TYyOa5RqAPpmgN8P2zJCnq2nhrnJSLE\nHvTPb/+m7ZzzgBLLOoei//jX7vPwZeEVVdC40Vk3ugVNVQec3U9tpaXpAoGBAIrI\nDXvsZA5kcC1QdrYPPaA9uKsIlLj6/+o2OHan3BwXZ53ig1CE0m4IwZl0PgV7DzlI\naibU7CKpHwjJPhWMcsYQf6ft2Oz5y7A2bW59D2IitTO+mg9AFbtBDuAlnl/fC1iR\nkGo9nrOMFVu1InGNLS3TFyYz1D/UdixirfcosTvxAoGBAJbccyvh1PB6cKeVzL93\nyGv2PEIhnefZZCeKSyzlvGt1gpfgKQE1VbteZUsCCu1w3yr+UDqCyHqvTmK0bECA\nRDvJX9T2lqCdVEDr/3lAxM9By9Dtkk3DYpbpQXuNWyd0ZCIqIuaXskPKqqTfwiq0\n1xgm45JqDuuLX9NYpMbdV9yY\n-----END PRIVATE KEY-----\n";
const CLIENT_EMAIL =
  "data-booking-care@bookingcare-389908.iam.gserviceaccount.com";
const SHEET_ID = "1sjr0nHNkzvjgz5ZdHSnO6ACYf6ZMZmkKdFaR1gQdpQ0";

let getHomepage = async (req, res) => {
  return res.render("homepage.ejs");
};

let getGoogleSheet = async (req, res) => {
  try {
    let currentDate = new Date();

    const format = "HH:mm DD/MM/YYYY";

    let formatedDate = moment(currentDate).format(format);

    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(SHEET_ID);

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    // append rows
    await sheet.addRow({
      "Tên Facebook": "Hỏi Dân IT",
      Email: "haryphamdev@gmail.com",
      "Số điện thoại": `'0321456789`,
      "Địa chỉ liên hệ": `'HCM`,
      "Lý do khám": `'mệt mỏi`,
      "Thời gian": formatedDate,
      "Tên khách hàng": "Eric",
    });

    return res.send("Writing data to Google Sheet succeeds!");
  } catch (e) {
    return res.send(
      "Oops! Something wrongs, check logs console for detail ... "
    );
  }
};

module.exports = {
  getHomepage: getHomepage,
  getGoogleSheet: getGoogleSheet,
};
