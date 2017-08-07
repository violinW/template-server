let BubbleError = (typeName)=>{
  let typeError=(message)=>{
    this.name = typeName;
    this.message = message || 'Default Message';
  };

  typeError.prototype = Object.create(Error.prototype);
  typeError.prototype.constructor = typeError;

  global[typeName]=typeError;
};


