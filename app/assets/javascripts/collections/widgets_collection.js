(function(App) {

  'use strict';

  var FIXTURES = [
    // Simple Bars
    {
      name: 'Total CO2 emissions',
      slug: 'total-co2-emissions',
      verified: true,
      date: '	2016-03-30T13:23:08+00:00',
      description: 'Description',
      source: 'Source',
      source_link: 'http://www.wri.org/resources/data-sets/aqueduct-water-stress-projections-data',
      authors: 'Authors',
      layer: {
        type: 'cartodb',
        name: 'Total CO2 emissions',
        color: '#333333',
        user: 'insights',
        sql: 'SELECT d.the_geom, d.the_geom_webmercator,(total_co2_wout_lucf+lucf) as total, r.iso  FROM cait_2_0_country_ghg_emissions r inner join countries d on iso_a3=iso where year=\'2011\'',
        cartocss: '#table_spec{ polygon-fill: #F7F7F7; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.1; line-opacity: 1;}#table_spec [ total <= 8742.68172] { polygon-fill: #252525;}#table_spec [ total <= 4917.98441] { polygon-fill: #525252;}#table_spec [ total <= 266.70737] { polygon-fill: #737373;}#table_spec [ total <= 150.80814] { polygon-fill: #969696;}#table_spec [ total <= 55.13663] { polygon-fill: #BDBDBD;}#table_spec [ total <= 11.12687] { polygon-fill: #D9D9D9;}#table_spec [ total <= 10.98882] { polygon-fill: #F7F7F7;}"',
        interactivity: 'total',
        active: true,
        zIndex: 0
      },
      //data: [{"year":"1990","total":49882.21334},{"year":"1991","total":50439.99762},{"year":"1992","total":53788.76345},{"year":"1993","total":54091.51656},{"year":"1994","total":54430.268},{"year":"1995","total":55702.0407},{"year":"1996","total":57092.01688},{"year":"1997","total":57529.63805},{"year":"1998","total":57811.34489},{"year":"1999","total":57926.15725},{"year":"2000","total":59692.20263},{"year":"2001","total":61106.12063},{"year":"2002","total":62043.8042},{"year":"2003","total":64553.98158},{"year":"2004","total":66915.40318},{"year":"2005","total":68740.32298},{"year":"2006","total":69965.1020100001},{"year":"2007","total":71781.30638},{"year":"2008","total":72262.57875},{"year":"2009","total":69906.36943},{"year":"2010","total":73082.2306000001},{"year":"2011","total":74736.86963}],
      data: [{"category":"Cat 1","value":49882.21334},{"category":"Cat 2","value":50439.99762},{"category":"Cat 3","value":53788.76345},{"category":"Cat 4","value":54091.51656}],
      chart: {"padding":{"top":25,"left":30,"bottom":30,"right":20},"width":270,"height":240,"data":[{"name":"table","values":[{"x":"1990","y":49882.21334},{"x":"1991","y":50439.99762},{"x":"1992","y":53788.76345},{"x":"1993","y":54091.51656},{"x":"1994","y":54430.268},{"x":"1995","y":55702.0407},{"x":"1996","y":57092.01688},{"x":"1997","y":57529.63805},{"x":"1998","y":57811.34489},{"x":"1999","y":57926.15725},{"x":"2000","y":59692.20263},{"x":"2001","y":61106.12063},{"x":"2002","y":62043.8042},{"x":"2003","y":64553.98158},{"x":"2004","y":66915.40318},{"x":"2005","y":68740.32298},{"x":"2006","y":69965.1020100001},{"x":"2007","y":71781.30638},{"x":"2008","y":72262.57875},{"x":"2009","y":69906.36943},{"x":"2010","y":73082.2306000001},{"x":"2011","y":74736.86963}],"format":{"parse":{"x":"date"}}},{"name":"summary","source":"table","transform":[{"type":"aggregate","summarize":{"y":["min","max"]}},{"type":"formula","field":"difference","expr":"datum.max_y-datum.min_y"},{"type":"formula","field":"min","expr":"datum.min_y === 0 ? 0 : (datum.difference > 0 ? datum.min_y - datum.difference * 0.2  : datum.min_y * 0.8)"},{"type":"formula","field":"min","expr":"datum.min < 0 ? 0 : datum.min"},{"type":"formula","field":"max","expr":"datum.max_y === 0 ? 10 : (datum.difference > 0 ? datum.max_y + datum.difference * 0.2 : datum.max_y * 1.2)"}]},{"name":"computed","source":"table","transform":[{"type":"cross","with":"summary"}]}],"scales":[{"name":"x","type":"time","range":"width","domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","domain":{"data":"computed","field":"a.y"},"domainMin":{"data":"computed","field":"b.min"},"domainMax":{"data":"computed","field":"b.max"},"zero":false,"nice":true}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"%Y","properties":{"ticks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"dx":{"value":5}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"width":{"field":{"group":"width"},"mult":0.03},"y":{"scale":"y","field":"y"},"y2":{"field":{"group":"height"}}},"update":{"fill":{"value":"#5BB1D2"}},"hover":{"fill":{"value":"#c32d7b"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-30},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]}
    },
    // Multiline
    // {
    //   name: 'Water levels in Northern California',
    //   slug: 'water-levels-in-northern-california',
    //   verified: true,
    //   date: '	2016-02-25T13:23:08+00:00',
    //   description: 'Reservoirs with daily observational data in the State of California are visualized; monthly averaged reservoir storage as a percent of total storage capacity is plotted through time.',
    //   source: 'USGS Center for Integrated Data Analytics',
    //   source_link: 'http://www.wri.org/resources/data-sets/aqueduct-water-stress-projections-data',
    //   authors: 'Luck, M., M. Landis, F. Gassert. 2015. “Aqueduct Water Stress Projections: Decadal projections of water supply and demand using CMIP5 GCMs.” Washington, DC: World Resources Institute.',
    //   layer:{
    //     type: 'cartodb',
    //     name: 'ny_healthcenter',
    //     color: '#005824',
    //     user: 'geriux',
    //     sql: 'SELECT * FROM ny_healthcenter',
    //     cartocss: '#ny_healthcenter{ polygon-fill: #EDF8FB; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1;}#ny_healthcenter [ hcentdist <= 51] { polygon-fill: #005824;}#ny_healthcenter [ hcentdist <= 43] { polygon-fill: #238B45;}#ny_healthcenter [ hcentdist <= 38] { polygon-fill: #41AE76;}#ny_healthcenter [ hcentdist <= 34] { polygon-fill: #66C2A4;}#ny_healthcenter [ hcentdist <= 26] { polygon-fill: #CCECE6;}#ny_healthcenter [ hcentdist <= 22] { polygon-fill: #D7FAF4;}#ny_healthcenter [ hcentdist <= 15] { polygon-fill: #EDF8FB;}',
    //     interactivity: false,
    //     active: true,
    //     zIndex: 0
    //   },
    //   chart: {"width":300,"height":180,"padding":{"top":40,"left":30,"bottom":50,"right":18},"data":[{"name":"table","values":[{"x":1990,"y":28,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1990,"y":55,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1991,"y":43,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1991,"y":91,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1992,"y":81,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1992,"y":53,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1993,"y":19,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1993,"y":87,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1994,"y":52,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1994,"y":48,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1995,"y":24,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1995,"y":49,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1996,"y":87,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1996,"y":66,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1997,"y":17,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1997,"y":27,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1998,"y":68,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1998,"y":16,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":2000,"y":49,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1999,"y":15,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1990,"y":8,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1990,"y":15,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1991,"y":23,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1991,"y":21,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1992,"y":31,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1992,"y":53,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1993,"y":49,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1993,"y":27,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1994,"y":22,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1994,"y":68,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1995,"y":44,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1995,"y":79,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1996,"y":67,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1996,"y":86,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1997,"y":27,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1997,"y":17,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1998,"y":58,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1998,"y":56,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":2000,"y":29,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1999,"y":25,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"}]},{"name":"categories","source":"table","transform":[{"type":"facet","groupby":["c"]}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}},{"name":"x-label","type":"ordinal","range":"width","zero":false,"points":false,"padding":0,"domain":{"data":"table","field":"c"}},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"group","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"marks":[{"type":"line","properties":{"enter":{"interpolate":{"value":"linear"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"scale":"color","field":"c"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}}]},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-25},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}},{"type":"rect","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"properties":{"enter":{"x":{"scale":"x-label","field":"c","offset":-10,"mult":0.7,"band":false},"width":{"value":6},"y":{"field":{"group":"height"},"mult":1.345},"y2":{"field":{"group":"height"},"mult":1.37}},"update":{"fill":{"scale":"color","field":"c"}},"hover":{"fill":{"value":"red"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"properties":{"enter":{"x":{"scale":"x-label","field":"c","offset":0.3,"mult":0.7,"band":false},"y":{"field":{"group":"height"},"mult":1.4},"text":{"template":"{{datum.c}}"},"fontSize":{"value":11},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]}
    // },
    // // Bar with line
    // {
    //   name: 'Protected Areas',
    //   slug: 'protected-areas',
    //   verified: true,
    //   date: '	2016-01-28T10:23:08+00:00',
    //   description: 'This dataset shows the location of terrestrial and marine protected areas around the world.',
    //   source: 'IUCN and UNEP',
    //   source_link: 'http://protectedplanet.net/',
    //   authors: 'IUCN and UNEP-WCMC, The World Database on Protected Areas (WDPA), Cambridge, UK: UNEP-WCMC. Available at: www.protectedplanet.net.',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_firebattalions',
    //     color: '#91003F',
    //     user: 'geriux',
    //     sql: 'SELECT * FROM ny_firebattalions',
    //     cartocss: '#ny_firebattalions{ polygon-fill: #F1EEF6; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1;}#ny_firebattalions [ firebn <= 58] { polygon-fill: #91003F;}#ny_firebattalions [ firebn <= 49.5] { polygon-fill: #CE1256;}#ny_firebattalions [ firebn <= 42.5] { polygon-fill: #E7298A;}#ny_firebattalions [ firebn <= 34] { polygon-fill: #DF65B0;}#ny_firebattalions [ firebn <= 22.5] { polygon-fill: #C994C7;}#ny_firebattalions [ firebn <= 15.5] { polygon-fill: #D4B9DA;}#ny_firebattalions [ firebn <= 8.5] { polygon-fill: #F1EEF6;}',
    //     interactivity: false,
    //     active: true,
    //     zIndex: 0
    //   },
    //   chart: {"width":280,"height":200,"padding":{"top":40,"left":30,"bottom":30,"right":30},"data":[{"name":"table","values":[{"x":"2000","y":43,"z":5,"unit":"kMM $","unitz":"M people"},{"x":"2001","y":91,"z":10,"unit":"kMM $","unitz":"M people"},{"x":"2002","y":81,"z":15,"unit":"kMM $","unitz":"M people"},{"x":"2003","y":53,"z":25,"unit":"kMM $","unitz":"M people"},{"x":"2004","y":19,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2005","y":87,"z":45,"unit":"kMM $","unitz":"M people"},{"x":"2006","y":52,"z":55,"unit":"kMM $","unitz":"M people"},{"x":"2007","y":48,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2008","y":24,"z":15,"unit":"kMM $","unitz":"M people"},{"x":"2009","y":49,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2010","y":87,"z":45,"unit":"kMM $","unitz":"M people"},{"x":"2011","y":66,"z":55,"unit":"kMM $","unitz":"M people"},{"x":"2012","y":17,"z":5,"unit":"kMM $","unitz":"M people"},{"x":"2013","y":27,"z":15,"unit":"kMM $","unitz":"M people"},{"x":"2014","y":68,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2015","y":16,"z":55,"unit":"kMM $","unitz":"M people"}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"domain":["2000","2015"],"nice":true},{"name":"y","type":"linear","range":"height","domain":{"data":"table","field":"y"},"nice":true},{"name":"z","type":"linear","range":"height","domain":{"data":"table","field":"z"},"nice":true}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"z","grid":false,"layer":"back","format":"f","orient":"right","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"width":{"field": {"group": "width"},"mult": 0.03},"y":{"scale":"y","field":"y"},"y2":{"scale":"y","value":0}},"update":{"fill":{"value":"#F0CCDF"}},"hover":{"fill":{"value":"red"}}}},{"type":"line","from":{"data":"table"},"properties":{"enter":{"interpolate":{"value":"linear"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"z","field":"z"},"stroke":{"value":"#C4347D"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-10},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unitz"]}]},"properties":{"enter":{"x":{"signal":"width","mult":1},"y":{"value":-15},"text":{"template":"{{datum.unitz}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]}
    // },
    // // Line chart
    // {
    //   name: 'Deforestation - Alerts',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_policeprecints',
    //     color: '#92CC2E',
    //     user: 'geriux',
    //     sql: 'SELECT * FROM ny_policeprecints',
    //     cartocss: '#ny_policeprecints{ polygon-fill: #FFFFCC; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1;}#ny_policeprecints [ precinct <= 123] { polygon-fill: #0C2C84;}#ny_policeprecints [ precinct <= 108.5] { polygon-fill: #225EA8;}#ny_policeprecints [ precinct <= 89] { polygon-fill: #1D91C0;}#ny_policeprecints [ precinct <= 71.5] { polygon-fill: #41B6C4;}#ny_policeprecints [ precinct <= 51] { polygon-fill: #7FCDBB;}#ny_policeprecints [ precinct <= 37] { polygon-fill: #C7E9B4;}#ny_policeprecints [ precinct <= 19.5] { polygon-fill: #FFFFCC;}',
    //     interactivity: 'precinct',
    //     active: true
    //   },
    //   chart: {"width":300,"height":180,"padding":{"top":10,"left":30,"bottom":30,"right":22},"data":[{"name":"table","values":[{"x":1990,"y":28,"c":"cat1","unit":"k alerts"},{"x":1991,"y":43,"c":"cat1","unit":"k alerts"},{"x":1992,"y":81,"c":"cat1","unit":"k alerts"},{"x":1993,"y":19,"c":"cat1","unit":"k alerts"},{"x":1994,"y":52,"c":"cat1","unit":"k alerts"},{"x":1995,"y":24,"c":"cat1","unit":"k alerts"},{"x":1996,"y":87,"c":"cat1","unit":"k alerts"},{"x":1997,"y":17,"c":"cat1","unit":"k alerts"},{"x":1998,"y":68,"c":"cat1","unit":"k alerts"},{"x":2000,"y":49,"c":"cat1","unit":"k alerts"}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":6,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"line","from":{"data":"table"},"properties":{"enter":{"interpolate":{"value":"cardinal"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"value":"#C4347D"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-5},"y":{"value":5},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]}
    // },
    // // Pie chart
    // {
    //   name: 'Shale Resources',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_healthcenter',
    //     color: '#AA2ECC',
    //     user: 'geriux',
    //     sql: 'SELECT * FROM ny_healthcenter',
    //     cartocss: '#ny_healthcenter { polygon-opacity: 0.7; line-color: #FFF; line-width: 0.5; line-opacity: 1;}#ny_healthcenter[shape_area=103337883.864] { polygon-fill: #A6CEE3;}#ny_healthcenter[shape_area=110039370.857] { polygon-fill: #1F78B4;}#ny_healthcenter[shape_area=117400522.051] { polygon-fill: #B2DF8A;}#ny_healthcenter[shape_area=194080081.549] { polygon-fill: #33A02C;}#ny_healthcenter[shape_area=209962160.415] { polygon-fill: #FB9A99;}#ny_healthcenter[shape_area=247475416.748] { polygon-fill: #E31A1C;}#ny_healthcenter[shape_area=320898046.388] { polygon-fill: #FDBF6F;}#ny_healthcenter[shape_area=498766079.716] { polygon-fill: #FF7F00;}#ny_healthcenter[shape_area=837537543.868] { polygon-fill: #CAB2D6;}#ny_healthcenter[shape_area=892996405.207] { polygon-fill: #6A3D9A;}#ny_healthcenter { polygon-fill: #DDDDDD;}',
    //     interactivity: false,
    //     active: true
    //   },
    //   chart: {"name":"arc","width":200,"height":200,"padding":{"top":25,"left":25,"bottom":20,"right":25},"data":[{"name":"table","values":[47,31,11,12,5],"transform":[{"type":"pie","field":"data"}]},{"name":"categories","values":["Construction","Fugitive Emissions","Electricity","Other Fuel","Transportation"]}],"scales":[{"name":"r","type":"sqrt","domain":{"data":"table","field":"data"},"range":[0,100]},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]}],"marks":[{"type":"arc","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"startAngle":{"field":"layout_start"},"endAngle":{"field":"layout_end"},"innerRadius":{"field":{"group":"height"},"mult":0.38},"outerRadius":{"field":{"group":"height"},"mult":0.47},"fill":{"scale":"color","field":"data"}}}},{"type":"text","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.51},"radius":{"field":{"group":"height"},"mult":0.55,"offset":0},"theta":{"field":"layout_mid"},"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"align":{"value":"center"},"baseline":{"value":"middle"},"text":{"template":"{{datum.data}}%"}}}}],"legends":[{"values":["Construction","Fugitive Emissions","Electricity","Other Fuel","Transportation"],"fill":"color","properties":{"title":{"fontSize":{"value":14}},"labels":{"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"text":{"template":"{{datum.data|truncate:15}}"}},"symbols":{"stroke":{"value":"transparent"}},"legend":{"x":{"field":{"group":"width"},"mult":0.5,"offset":-42},"y":{"field":{"group":"height"},"mult":0.5,"offset":-38}}}}]}
    // },
    // // Scatter chart
    // {
    //   name: 'Flood risk',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_firebattalions',
    //     color: '#CC2E2E',
    //     user: 'geriux',
    //     sql: 'SELECT * FROM ny_firebattalions',
    //     cartocss: '#ny_firebattalions{ polygon-fill: #F1EEF6; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1;}#ny_firebattalions [ firebn <= 58] { polygon-fill: #91003F;}#ny_firebattalions [ firebn <= 49.5] { polygon-fill: #CE1256;}#ny_firebattalions [ firebn <= 42.5] { polygon-fill: #E7298A;}#ny_firebattalions [ firebn <= 34] { polygon-fill: #DF65B0;}#ny_firebattalions [ firebn <= 22.5] { polygon-fill: #C994C7;}#ny_firebattalions [ firebn <= 15.5] { polygon-fill: #D4B9DA;}#ny_firebattalions [ firebn <= 8.5] { polygon-fill: #F1EEF6;}',
    //     interactivity: false,
    //     active: true
    //   },
    //   chart: {"width":200,"height":200,"padding":{"top":30,"left":35,"bottom":40,"right":30},"signals":[{"name":"tooltip","init":{},"streams":[{"type":"symbol:mouseover","expr":"datum"},{"type":"symbol:mouseout","expr":"{}"}]}],"data":[{"name":"table","values":[{"x":1,"y":8,"category":"cat1"},{"x":1,"y":28,"category":"cat2"},{"x":1,"y":48,"category":"cat3"},{"x":2,"y":18,"category":"cat4"},{"x":1.5,"y":48,"category":"cat1"},{"x":1.5,"y":4,"category":"cat2"},{"x":1,"y":38,"category":"cat3"},{"x":2,"y":18,"category":"cat4"},{"x":3,"y":58,"category":"cat1"},{"x":3,"y":38,"category":"cat2"},{"x":2,"y":48,"category":"cat3"},{"x":1,"y":28,"category":"cat4"},{"x":5,"y":8,"category":"cat1"},{"x":5,"y":28,"category":"cat2"},{"x":5,"y":48,"category":"cat3"},{"x":4,"y":18,"category":"cat4"},{"x":6,"y":5,"category":"cat1"},{"x":6,"y":38,"category":"cat2"},{"x":6,"y":18,"category":"cat3"},{"x":5,"y":28,"category":"cat4"}]}],"predicates":[{"name":"tooltip","type":"==","operands":[{"signal":"tooltip._id"},{"arg":"id"}]}],"scales":[{"name":"x","type":"linear","range":"width","round":true,"nice":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","round":true,"nice":true,"domain":{"data":"table","field":"y"}},{"name":"color","type":"ordinal","domain":{"data":"table","field":"category"},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]}],"axes":[{"type":"x","scale":"x","ticks":5,"format":"f","layer":"back","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","scale":"y","grid":true,"layer":"back","ticks":5,"format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"grid":{"stroke":{"value":"#333"},"strokeWidth":{"value":1},"strokeOpacity":{"value":0.1}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"symbol","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"fill":{"scale":"color","field":"category"},"fillOpacity":{"value":0.7}},"update":{"size":{"value":36},"stroke":{"value":"transparent"}}}},{"type":"group","from":{"data":"table"},"properties":{"enter":{"align":{"value":"center"},"stroke":{"value":"transparent"},"strokeWidth":{"value":0},"fill":{"value":"transparent"}},"update":{"x":{"scale":"x","signal":"tooltip.x","offset":"8"},"y":{"scale":"y","signal":"tooltip.y","offset":"8"},"width":{"value":50},"height":{"value":25},"fill":{"rule":[{"predicate":{"name":"tooltip","id":{"value":null}},"value":"transparent"},{"value":"#efefef"}]},"strokeWidth":{"rule":[{"predicate":{"name":"tooltip","id":{"value":null}},"value":"0"},{"value":0.5}]},"stroke":{"rule":[{"predicate":{"name":"tooltip","id":{"value":null}},"value":"transparent"},{"value":"#222"}]},"fillOpacity":{"rule":[{"predicate":{"name":"tooltip","id":{"value":null}},"value":0},{"value":1}]}}},"marks":[{"type":"text","properties":{"enter":{"align":{"value":"center"},"fill":{"value":"#333"}},"update":{"x":{"value":23},"y":{"value":15},"text":{"signal":"tooltip.y"},"fill":{"value":"black"},"fontWeight":{"value":"bold"}}}}]}]}
    // },
    // // Number chart
    // {
    //   name: 'GDP Affected by flood risk',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_policeprecints',
    //     color: '#2E66CC',
    //     user: 'geriux',
    //     sql: 'SELECT * FROM ny_policeprecints',
    //     cartocss: '#ny_policeprecints{ polygon-fill: #FFFFCC; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1;}#ny_policeprecints [ precinct <= 123] { polygon-fill: #0C2C84;}#ny_policeprecints [ precinct <= 108.5] { polygon-fill: #225EA8;}#ny_policeprecints [ precinct <= 89] { polygon-fill: #1D91C0;}#ny_policeprecints [ precinct <= 71.5] { polygon-fill: #41B6C4;}#ny_policeprecints [ precinct <= 51] { polygon-fill: #7FCDBB;}#ny_policeprecints [ precinct <= 37] { polygon-fill: #C7E9B4;}#ny_policeprecints [ precinct <= 19.5] { polygon-fill: #FFFFCC;}',
    //     interactivity: 'precinct',
    //     active: true
    //   },
    //   chart: {"width":300,"height":180,"padding":{"top":10,"left":10,"bottom":30,"right":15},"data":[{"name":"table","values":[{"x":"582,445","y":null,"c":"cat1","unit":"MM $"},{"x":"GDP affected","y":"2030","c":"cat2","unit":""},{"x":"924,539","y":null,"c":"cat3","unit":"MM $"}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}}],"marks":[{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"text":{"template":"{{datum.x}}"},"fontSize":{"value":55},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.64},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":12},"fontWeight":{"value":500},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat2'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.9},"text":{"template":"{{datum.x}} in {{datum.y}}"},"fontSize":{"value":12},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat3'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":1},"text":{"template":"{{datum.x}} {{datum.unit}}"},"fontSize":{"value":15},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]}
    // },
    // // Simple Bars
    // {
    //   name: 'Tree cover loss',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_healthcenter',
    //     color: '#92CC2E'
    //   },
    //   chart: {"width":280,"height":200,"padding":{"top":20,"left":40,"bottom":30,"right":20},"data":[{"name":"table","values":[{"x":"2000","y":43},{"x":"2001","y":91},{"x":"2002","y":81},{"x":"2003","y":53},{"x":"2004","y":19},{"x":"2005","y":87},{"x":"2006","y":52},{"x":"2007","y":48},{"x":"2008","y":24},{"x":"2009","y":49},{"x":"2010","y":87},{"x":"2011","y":66},{"x":"2012","y":17},{"x":"2013","y":27},{"x":"2014","y":68},{"x":"2015","y":16}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"domain":["2000","2015"],"nice":true},{"name":"y","type":"linear","range":"height","domain":{"data":"table","field":"y"},"nice":true}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"width":{"field":{"group":"width"},"mult":0.03},"y":{"scale":"y","field":"y"},"y2":{"scale":"y","value":0}},"update":{"fill":{"value":"#5BB1D2"}},"hover":{"fill":{"value":"#c32d7b"}}}}]}
    // },
    // // Multiline
    // {
    //   name: 'Total Greenhouse emissions',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_firebattalions',
    //     color: '#AA2ECC'
    //   },
    //   chart: {"width":300,"height":180,"padding":{"top":40,"left":30,"bottom":50,"right":18},"data":[{"name":"table","values":[{"x":1990,"y":28,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1990,"y":55,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1991,"y":43,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1991,"y":91,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1992,"y":81,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1992,"y":53,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1993,"y":19,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1993,"y":87,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1994,"y":52,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1994,"y":48,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1995,"y":24,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1995,"y":49,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1996,"y":87,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1996,"y":66,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1997,"y":17,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1997,"y":27,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1998,"y":68,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1998,"y":16,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":2000,"y":49,"c":"N2o","unit":"kTons of CO2 equivalent"},{"x":1999,"y":15,"c":"Ch4","unit":"kTons of CO2 equivalent"},{"x":1990,"y":8,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1990,"y":15,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1991,"y":23,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1991,"y":21,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1992,"y":31,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1992,"y":53,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1993,"y":49,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1993,"y":27,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1994,"y":22,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1994,"y":68,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1995,"y":44,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1995,"y":79,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1996,"y":67,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1996,"y":86,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1997,"y":27,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1997,"y":17,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":1998,"y":58,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1998,"y":56,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"},{"x":2000,"y":29,"c":"F Gas","unit":"kTons of CO2 equivalent"},{"x":1999,"y":25,"c":"Total Ghg Emissions","unit":"kTons of CO2 equivalent"}]},{"name":"categories","source":"table","transform":[{"type":"facet","groupby":["c"]}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}},{"name":"x-label","type":"ordinal","range":"width","zero":false,"points":false,"padding":0,"domain":{"data":"table","field":"c"}},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"group","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"marks":[{"type":"line","properties":{"enter":{"interpolate":{"value":"linear"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"scale":"color","field":"c"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}}]},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-25},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}},{"type":"rect","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"properties":{"enter":{"x":{"scale":"x-label","field":"c","offset":-10,"mult":0.7,"band":false},"width":{"value":6},"y":{"field":{"group":"height"},"mult":1.345},"y2":{"field":{"group":"height"},"mult":1.37}},"update":{"fill":{"scale":"color","field":"c"}},"hover":{"fill":{"value":"red"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"properties":{"enter":{"x":{"scale":"x-label","field":"c","offset":0.3,"mult":0.7,"band":false},"y":{"field":{"group":"height"},"mult":1.4},"text":{"template":"{{datum.c}}"},"fontSize":{"value":11},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]}
    // },
    // // Bar with line
    // {
    //   name: 'Population and GDP',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_policeprecints',
    //     color: '#CC2E2E'
    //   },
    //   chart: {"width":280,"height":200,"padding":{"top":40,"left":30,"bottom":30,"right":30},"data":[{"name":"table","values":[{"x":"2000","y":43,"z":5,"unit":"kMM $","unitz":"M people"},{"x":"2001","y":91,"z":10,"unit":"kMM $","unitz":"M people"},{"x":"2002","y":81,"z":15,"unit":"kMM $","unitz":"M people"},{"x":"2003","y":53,"z":25,"unit":"kMM $","unitz":"M people"},{"x":"2004","y":19,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2005","y":87,"z":45,"unit":"kMM $","unitz":"M people"},{"x":"2006","y":52,"z":55,"unit":"kMM $","unitz":"M people"},{"x":"2007","y":48,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2008","y":24,"z":15,"unit":"kMM $","unitz":"M people"},{"x":"2009","y":49,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2010","y":87,"z":45,"unit":"kMM $","unitz":"M people"},{"x":"2011","y":66,"z":55,"unit":"kMM $","unitz":"M people"},{"x":"2012","y":17,"z":5,"unit":"kMM $","unitz":"M people"},{"x":"2013","y":27,"z":15,"unit":"kMM $","unitz":"M people"},{"x":"2014","y":68,"z":35,"unit":"kMM $","unitz":"M people"},{"x":"2015","y":16,"z":55,"unit":"kMM $","unitz":"M people"}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"domain":["2000","2015"],"nice":true},{"name":"y","type":"linear","range":"height","domain":{"data":"table","field":"y"},"nice":true},{"name":"z","type":"linear","range":"height","domain":{"data":"table","field":"z"},"nice":true}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"z","grid":false,"layer":"back","format":"f","orient":"right","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"width":{"field": {"group": "width"},"mult": 0.03},"y":{"scale":"y","field":"y"},"y2":{"scale":"y","value":0}},"update":{"fill":{"value":"#F0CCDF"}},"hover":{"fill":{"value":"red"}}}},{"type":"line","from":{"data":"table"},"properties":{"enter":{"interpolate":{"value":"linear"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"z","field":"z"},"stroke":{"value":"#C4347D"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-10},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unitz"]}]},"properties":{"enter":{"x":{"signal":"width","mult":1},"y":{"value":-15},"text":{"template":"{{datum.unitz}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]}
    // },
    // // Line chart
    // {
    //   name: 'Deforestation - Alerts',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_healthcenter',
    //     color: '#2E66CC'
    //   },
    //   chart: {"width":300,"height":180,"padding":{"top":10,"left":30,"bottom":30,"right":22},"data":[{"name":"table","values":[{"x":1990,"y":28,"c":"cat1","unit":"k alerts"},{"x":1991,"y":43,"c":"cat1","unit":"k alerts"},{"x":1992,"y":81,"c":"cat1","unit":"k alerts"},{"x":1993,"y":19,"c":"cat1","unit":"k alerts"},{"x":1994,"y":52,"c":"cat1","unit":"k alerts"},{"x":1995,"y":24,"c":"cat1","unit":"k alerts"},{"x":1996,"y":87,"c":"cat1","unit":"k alerts"},{"x":1997,"y":17,"c":"cat1","unit":"k alerts"},{"x":1998,"y":68,"c":"cat1","unit":"k alerts"},{"x":2000,"y":49,"c":"cat1","unit":"k alerts"}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":6,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"line","from":{"data":"table"},"properties":{"enter":{"interpolate":{"value":"cardinal"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"value":"#C4347D"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-5},"y":{"value":5},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]}
    // },
    // // Number chart
    // {
    //   name: 'GDP Affected by flood risk',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_firebattalions',
    //     color: '#92CC2E'
    //   },
    //   chart: {"width":300,"height":180,"padding":{"top":10,"left":10,"bottom":30,"right":15},"data":[{"name":"table","values":[{"x":"582,445","y":null,"c":"cat1","unit":"MM $"},{"x":"GDP affected","y":"2030","c":"cat2","unit":""},{"x":"924,539","y":null,"c":"cat3","unit":"MM $"}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}}],"marks":[{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"text":{"template":"{{datum.x}}"},"fontSize":{"value":55},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.64},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":12},"fontWeight":{"value":500},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat2'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.9},"text":{"template":"{{datum.x}} in {{datum.y}}"},"fontSize":{"value":12},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c == 'cat3'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":1},"text":{"template":"{{datum.x}} {{datum.unit}}"},"fontSize":{"value":15},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]}
    // },
    // // Pie chart
    // {
    //   name: 'Shale Resources',
    //   description: 'Centre for Research on Lorem...',
    //   slug: 'water-levels-in-northen-california',
    //   layer: {
    //     type: 'cartodb',
    //     name: 'ny_policeprecints',
    //     color: '#AA2ECC'
    //   },
    //   chart: {"name":"arc","width":200,"height":200,"padding":{"top":25,"left":25,"bottom":20,"right":25},"data":[{"name":"table","values":[47,31,11,12,5],"transform":[{"type":"pie","field":"data"}]},{"name":"categories","values":["Construction","Fugitive Emissions","Electricity","Other Fuel","Transportation"]}],"scales":[{"name":"r","type":"sqrt","domain":{"data":"table","field":"data"},"range":[0,100]},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]}],"marks":[{"type":"arc","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"startAngle":{"field":"layout_start"},"endAngle":{"field":"layout_end"},"innerRadius":{"field":{"group":"height"},"mult":0.38},"outerRadius":{"field":{"group":"height"},"mult":0.47},"fill":{"scale":"color","field":"data"}}}},{"type":"text","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.51},"radius":{"field":{"group":"height"},"mult":0.55,"offset":0},"theta":{"field":"layout_mid"},"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"align":{"value":"center"},"baseline":{"value":"middle"},"text":{"template":"{{datum.data}}%"}}}}],"legends":[{"values":["Construction","Fugitive Emissions","Electricity","Other Fuel","Transportation"],"fill":"color","properties":{"title":{"fontSize":{"value":14}},"labels":{"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"text":{"template":"{{datum.data|truncate:15}}"}},"symbols":{"stroke":{"value":"transparent"}},"legend":{"x":{"field":{"group":"width"},"mult":0.5,"offset":-42},"y":{"field":{"group":"height"},"mult":0.5,"offset":-38}}}}]}
    // }
  ];

  App.Collection.Widgets = App.Core.Collection.extend({

    model: App.Model.Widget,

    /**
     * Method to search a string in name
     * @param  {String} value
     */
    search: function(value) {
      var regex = new RegExp(value, 'i');
      return this.filter(function(m) {
        return m.attributes.name.search(regex) !== -1;
      });
    },

    fixtures: function() {
      this.reset(FIXTURES);
    },

    getBySlug: function(slug) {
      var data = this.findWhere({
        slug: slug
      });

      if (data) {
        data = data.toJSON();
      } else {
        data = [];
      }
      return data;
    }
  });

}).call(this, this.App);
