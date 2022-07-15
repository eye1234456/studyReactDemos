/* eslint-disable no-unused-vars */

import { createServer } from 'miragejs'
import data from './data/database.json'

const addIcons = (list, category, { name = undefined, extension = 'jpg' } = {}) => {
  if (list[0].icon) {
    return list;
  }
  if (name === undefined) {
    name = category;
  }

  list.forEach((item, index) => {
    item.icon = `/images/${category}/${name}${index + 1}.${extension}`
  });

  return list;
}

createServer({
  routes() {
    this.get("/api/users", () => [
      { id: "1", name: "Luke" },
      { id: "2", name: "Leia" },
      { id: "3", name: "Anakin" },
    ])
    this.get("/api/swiper", () => addIcons(data.swiper, 'swiper', { name: '' }));
    this.get("/api/otherapp", () => addIcons(data.otherapp, 'otherapp', { name: 'app', extension: 'png' }));
    this.get("/api/spike", () => {
      if (!data.spike.data) {
        data.spike.data = addIcons(data.spike.store, 'spike');
      }
      return data.spike;
    });
    this.get("/api/more", () => addIcons(data.more, 'more'));
    this.get("/api/like", () => addIcons(data.like, 'like'));
  },
})