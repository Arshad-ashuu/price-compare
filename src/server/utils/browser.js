import puppeteer from 'puppeteer';

export async function launchBrowser() {
  return await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}