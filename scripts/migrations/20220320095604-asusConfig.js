module.exports = {
  async up(db) {
    const asusConfig = {
      url: 'https://asus.com',
      xml: [
        'https://www.asus.com/sitemap/global1.xml',
        'https://www.asus.com/sitemap/global2.xml',
        'https://www.asus.com/sitemap/global3.xml',
        'https://www.asus.com/sitemap/global4.xml',
        'https://www.asus.com/sitemap/global5.xml',
        'https://www.asus.com/sitemap/global6.xml',
        'https://www.asus.com/sitemap/global7.xml',
        'https://www.asus.com/sitemap/global8.xml',
      ],
      utils: {
        cookieAcceptSelector: 'div.btn-asus.btn-ok.btn-read-ck',
        techSpecSelector: 'LevelFourProductPageHeaderDesktop__tabItemLink__',
        specSelector: 'TechSpec__techSpecContainer__',
        specSelectorDOM: 'div',
        captchaType: null,
      },
    };

    await db.collection('asusConfig').insertOne(asusConfig);
  },

  async down(db) {
    await db.collection('asusConfig').drop();
  },
};
