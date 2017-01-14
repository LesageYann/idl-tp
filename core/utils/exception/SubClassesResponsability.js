function ExceptionBound(intValue, direction) {
  this.value = intValue;
  this.direction = direction,
    this.name = "ExceptionYBound";
}

ExceptionBound.prototype.toString = function () {
  return this.name + ': "' + this.value + '" in ' + this.direction;
};
