
// 火星坐标求距离
export function getDistance(point1,point2){
  let radLat1 = point1.latitude * Math.PI / 180.0;
  let radLat2 = point2.latitude * Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let b = point1.longitude * Math.PI / 180.0 - point2.longitude * Math.PI / 180.0;
  let distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2) * Math.pow(Math.sin(b/2),2)));
  distance = distance * 6378.137 ;
  distance = Math.round(distance * 10000) / 10000;
  return distance;
}
