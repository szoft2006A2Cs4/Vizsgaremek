class AdCardTemp {
  constructor(ins) {
    this.Id = ins.id;
    this.IName = ins.name;
    this.Cost = ins.cost;
    this.Desc = ins.description;
    this.Condition = ins.condition;
    this.IsPremium = ins.isPremium;
    this.SCat = ins.scName;

    this.Seller = {
      Id: item.seller.id,
      Name: item.seller.name,
      Phone: item.seller.phoneNumber,
      Review: item.seller.review,
      City: item.seller.city,
    };

    this.imgs = this._generateInstrumentImages(item);
  }

  _generateUrl(publicId) {
    const cloudName = "dknhbvrq9";
    return `https://res.cloudinary.com/${cloudName}/image/upload/${encodeURIComponent(publicId)}`;
  }

  _generateInstrumentImages(item, count) {
    const cleanInsName = item.name.split(" ").join("");
    const urls = [];

    for (let i = 0; i < count; i++) {
      const publicId = `${cleanInsName}_${item.seller.imageId}_${i}`;
      urls.push(this._generateUrl(publicId));
    }
    return urls;
  }
}
