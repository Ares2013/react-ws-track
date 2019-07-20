import trim from './trim';

const brandSparrowServer = {
  wondershare:"helper-stats.wondershare.com/sparrow/visit",
  aimersoft:"helper-stats.aimersoft.com/sparrow/visit",
  iskysoft:"helper-stats.isky.com/sparrow/visit",
  keepvid:"helper-stats.keepvid.com/sparrow/visit"
}
export default function sparrowServer(s) {
  let configSparrowServer = new Array();
  if (s && Array.isArray(s)){
    configsOrTrackingId.forEach((config) => {
      let configSparrow = {
        brandName:"",
        sparrowServer:""
      }
      if (typeof config !== 'object') {
        warn('All configs must be an object');
        return;
      }
      if (config && config.brandName) {
          let brandName = config.brandName;
          if (brandSparrowServer[brandName]) {
              configSparrow.brandName = brandName;
              configSparrow.sparrowServer = brandSparrowServer[brandName];
              configSparrowServer.push(configSparrow);
          }
      }
    });
  } else {
    let configSparrow = {
      brandName:"",
      sparrowServer:""
    }
    let brandName = s;
    if (brandSparrowServer[brandName]) {
        configSparrow.brandName = brandName;
        configSparrow.sparrowServer = brandSparrowServer[brandName];
        configSparrowServer.push(configSparrow);
    }
  }
  return configSparrowServer;
}
