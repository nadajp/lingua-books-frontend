export default class Product {
    constructor(id, name, price, description, language, author, condition, categoryId, subcategoryId, publisher, publicationYear, isbn, length, format, dimensionLength, dimensionWidth, sellerId) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.description = description;
      this.language = language;
      this.author = author;
      this.condition = condition;
      this.categoryId = categoryId;
      this.subcategoryId = subcategoryId;
      this.publisher = publisher;
      this.publicationYear = publicationYear;
      this.isbn = isbn;
      this.length = length;
      this.format = format;
      this.dimensionLength = dimensionLength;
      this.dimensionWidth = dimensionWidth;
      this.sellerId = sellerId;
    }
    setId(id) {
      this.id = id;
    }
    
    // additional validation will be added here
    setName(name) {
      this.name = name;
    }
    
    setPrice(price) {
      this.price = price;
    }
    
    setDescription(description) {
      this.description = description;
    }
    
    setLanguage(language) {
      this.language = language;
    }
    
    setAuthor(author) {
      this.author = author;
    }
    
    setCondition(condition) {
      this.condition = condition;
    }
    
    setCategoryId(categoryId) {
      this.categoryId = categoryId;
    }
    
    setSubcategoryId(subcategoryId) {
      this.subcategoryId = subcategoryId;
    }
    
    setPublisher(publisher) {
      this.publisher = publisher;
    }
    
    setPublicationYear(publicationYear) {
      this.publicationYear = publicationYear;
    }
    
    setIsbn(isbn) {
      this.isbn = isbn;
    }
    
    setLength(length) {
      this.length = length;
    }
    
    setFormat(format) {
      this.format = format;
    }
    
    setDimensionLength(dimensionLength) {
      this.dimensionLength = dimensionLength;
    }
    
    setDimensionWidth(dimensionWidth) {
      this.dimensionWidth = dimensionWidth;
    }
    
    setSellerId(sellerId) {
      this.sellerId = sellerId;
    }
  }
  