const contentMap = {
  siteUrl: "https://sports-v.com",
  brandLabel: "v体育",
  categories: [
    {
      id: "live",
      title: "直播赛事",
      tags: ["NBA", "英超", "欧冠", "v体育推荐"],
      sections: [
        { name: "今日焦点", slug: "highlights", entries: 12 },
        { name: "即将开始", slug: "upcoming", entries: 8 }
      ]
    },
    {
      id: "esports",
      title: "电竞专区",
      tags: ["LOL", "Dota2", "CS2", "v体育电竞"],
      sections: [
        { name: "赛程预告", slug: "schedule", entries: 20 },
        { name: "战队排名", slug: "rankings", entries: 10 }
      ]
    },
    {
      id: "news",
      title: "体育资讯",
      tags: ["转会", "伤病", "深度分析", "v体育新闻"],
      sections: [
        { name: "头条", slug: "top-stories", entries: 6 },
        { name: "专栏", slug: "columns", entries: 4 }
      ]
    },
    {
      id: "odds",
      title: "赔率中心",
      tags: ["盘口", "水位", "v体育赔率"],
      sections: [
        { name: "热门赔率", slug: "popular", entries: 15 },
        { name: "冷门追踪", slug: "underdog", entries: 7 }
      ]
    }
  ],
  keywords: [
    "v体育",
    "体育直播",
    "电竞比分",
    "赔率分析",
    "赛事预测"
  ]
};

function searchContent(query, source) {
  const data = source || contentMap;
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results = [];

  data.categories.forEach(cat => {
    const catMatch = cat.title.toLowerCase().includes(q) ||
                     cat.tags.some(t => t.toLowerCase().includes(q));
    if (catMatch) {
      results.push({
        type: "category",
        id: cat.id,
        title: cat.title,
        matchedBy: "category"
      });
    }

    cat.sections.forEach(sec => {
      const secMatch = sec.name.toLowerCase().includes(q) ||
                       sec.slug.toLowerCase().includes(q);
      if (secMatch) {
        results.push({
          type: "section",
          category: cat.id,
          name: sec.name,
          slug: sec.slug,
          matchedBy: "section"
        });
      }
    });
  });

  data.keywords.forEach(kw => {
    if (kw.toLowerCase().includes(q)) {
      results.push({
        type: "keyword",
        value: kw,
        matchedBy: "keyword"
      });
    }
  });

  return results;
}

function filterByTag(tag, data) {
  const src = data || contentMap;
  const t = tag.trim().toLowerCase();
  if (!t) return [];

  const matched = [];
  src.categories.forEach(cat => {
    if (cat.tags.some(tg => tg.toLowerCase() === t)) {
      matched.push(cat);
    }
  });
  return matched;
}

function generateNavHtml() {
  let html = `<nav class="v-nav" data-base-url="${contentMap.siteUrl}">\n`;
  html += `  <span class="brand">${contentMap.brandLabel}</span>\n`;
  contentMap.categories.forEach(cat => {
    html += `  <a href="/${cat.id}" class="nav-link">${cat.title}</a>\n`;
  });
  html += `</nav>\n`;
  return html;
}

function quickSearch(query) {
  const results = searchContent(query);
  return results.slice(0, 20);
}

export { contentMap, searchContent, filterByTag, generateNavHtml, quickSearch };