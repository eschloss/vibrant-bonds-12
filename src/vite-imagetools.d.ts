declare module "*?as=picture" {
  const src: {
    sources: { type: string; srcset: string }[];
    img: { src: string; w: number; h: number };
  };
  export default src;
}

declare module "*?format=*" {
  const src: any;
  export default src;
}

