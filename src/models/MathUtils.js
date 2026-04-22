export function rand(a, b) {
  return a + Math.random() * (b - a);
}

export function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function wrap(obj, width, height) {
  if (obj.x < 0) obj.x += width;
  if (obj.x > width) obj.x -= width;
  if (obj.y < 0) obj.y += height;
  if (obj.y > height) obj.y -= height;
}

export function makeVerts(s) {
  let n = 8 + Math.floor(Math.random() * 4);
  let v = [];
  for (let i = 0; i < n; i++) {
    let a = (i / n) * Math.PI * 2;
    let r = 0.75 + Math.random() * 0.25;
    v.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  return v;
}
