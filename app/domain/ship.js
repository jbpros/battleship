var Ship = function Ship(name, size) {
  var self = {
    getName: function getName() { return name; },
    getSize: function getSize() { return size; }
  };
  return self;
};

module.exports = Ship;
