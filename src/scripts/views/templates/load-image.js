import CONFIG from '../../globals/config';

const loadImage = (src) => `
      <img data-src="${CONFIG.BASE_IMAGE_URL}small/${src.pictureId}" class="lazyload article_thumbnail_image" alt="${src.name}">
`;

export default loadImage;
