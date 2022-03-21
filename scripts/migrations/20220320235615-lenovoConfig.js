module.exports = {
  async up(db) {
    const lenovoConfig = {
      url: 'https://lenovo.com',
      xml: ['https://www.lenovo.com/sitemap-auto/089-intsitemap-us-en.xml'],
      utils: {
        productSummarySelector: 'product_summary',
        productSummaryDOM: 'h2',
      },
    };
    await db.collection('lenovoConfig').insertOne(lenovoConfig);
  },

  async down(db) {
    await db.collection('lenovoConfig').drop();
  },
};
