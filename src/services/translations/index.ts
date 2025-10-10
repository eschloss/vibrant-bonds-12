
// Dynamically import only the active locale to avoid bundling all languages
export const fetchTranslations = async (lang: string) => {
  const locale = ["en", "es"].includes(lang) ? lang : "en";
  if (locale === "es") {
    const [shared, about, mission, activities, realLifeMagic, city, citylist, communities, contact, forms, hero, howItWorks, icebreakers, team, lonelinessEpidemic, legal] = await Promise.all([
      import("./shared").then(m => m.shared.es),
      import("./about").then(m => m.about.es),
      import("./mission").then(m => m.mission.es),
      import("./activities").then(m => m.activities.es),
      import("./realLifeMagic").then(m => m.realLifeMagic.es),
      import("./city").then(m => m.city.es),
      import("./citylist").then(m => m.citylist.es),
      import("./communities").then(m => m.communities.es),
      import("./contact").then(m => m.contact.es),
      import("./forms").then(m => m.forms.es),
      import("./hero").then(m => m.hero.es),
      import("./howItWorks").then(m => m.howItWorks.es),
      import("./icebreakers").then(m => m.icebreakers.es),
      import("./team").then(m => m.team.es),
      import("./lonelinessEpidemic").then(m => m.lonelinessEpidemic.es),
      import("./legal").then(m => m.legal.es),
    ]);
    return {
      ...shared,
      ...about,
      ...mission,
      ...activities,
      ...realLifeMagic,
      ...city,
      ...citylist,
      ...communities,
      ...contact,
      ...forms,
      ...hero,
      ...howItWorks,
      ...icebreakers,
      ...team,
      ...lonelinessEpidemic,
      ...legal,
    };
  }

  const [shared, about, mission, activities, realLifeMagic, city, citylist, communities, contact, forms, hero, howItWorks, icebreakers, team, lonelinessEpidemic, legal] = await Promise.all([
    import("./shared").then(m => m.shared.en),
    import("./about").then(m => m.about.en),
    import("./mission").then(m => m.mission.en),
    import("./activities").then(m => m.activities.en),
    import("./realLifeMagic").then(m => m.realLifeMagic.en),
    import("./city").then(m => m.city.en),
    import("./citylist").then(m => m.citylist.en),
    import("./communities").then(m => m.communities.en),
    import("./contact").then(m => m.contact.en),
    import("./forms").then(m => m.forms.en),
    import("./hero").then(m => m.hero.en),
    import("./howItWorks").then(m => m.howItWorks.en),
    import("./icebreakers").then(m => m.icebreakers.en),
    import("./team").then(m => m.team.en),
    import("./lonelinessEpidemic").then(m => m.lonelinessEpidemic.en),
    import("./legal").then(m => m.legal.en),
  ]);
  return {
    ...shared,
    ...about,
    ...mission,
    ...activities,
    ...realLifeMagic,
    ...city,
    ...citylist,
    ...communities,
    ...contact,
    ...forms,
    ...hero,
    ...howItWorks,
    ...icebreakers,
    ...team,
    ...lonelinessEpidemic,
    ...legal,
  };
};
