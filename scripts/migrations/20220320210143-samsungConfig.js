module.exports = {
  async up(db) {
    const samsungConfig = {
      url: 'https://samsung.com',
      xml: ['http://www.samsung.com/us/business_sitemap.xml'],
      utils: {
        responseUrlFilter: ['/configurator/features/', 'b2b.json'],
        promoSelector: 'gnb-promo-close',
        promoSelectorDOM: 'a',
        modelSelector: 'oos-title2',
        modelSelectorDOM: 'h1',
        productDataFilter: 'compare-palette-section',
        captchaType: null,
      },
    };
    await db.collection('samsungConfig').insertOne(samsungConfig);
  },

  async down(db) {
    await db.collection('samsungConfig').drop();
  },
};
