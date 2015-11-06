
// Extends Phaser.Group.
// This type of group is used to display multiple subgroups to be z-sorted
// Eg. create a group for the enemies, the bullets, and the player individually
// then insert them all into a sort group and sort based on anything
var DisplayGroup = function(game, name='DisplayGroup', entries=[]) {
  Phaser.Group.call(this, game)
  this.drawCache = [];
  this.name = name
  entries.forEach(e => this.add(e))
}

DisplayGroup.prototype = Object.create(Phaser.Group.prototype)
DisplayGroup.prototype.constructor = DisplayGroup;

// this method overrides PIXI.DisplayObjectContainer._renderWebGL
// only commented lines were changed
DisplayGroup.prototype._renderWebGL = function(renderSession) {

  if (!this.visible || this.alpha <= 0) return;

  if (this._cacheAsBitmap) {
    this._renderCachedSprite(renderSession);
    return;
  }

  if (this._mask || this._filters) {
    if (this._filters) {
      renderSession.spriteBatch.flush();
      renderSession.filterManager.pushFilter(this._filterBlock);
    }
    if (this._mask) {
      renderSession.spriteBatch.stop();
      renderSession.maskManager.pushMask(this.mask, renderSession);
      renderSession.spriteBatch.start();
    }
    for(var i=0, j=this.drawCache.length; i<j; i++) {
      // this.children[i]._renderWebGL(renderSession);
      this.drawCache[i]._renderWebGL(renderSession);
    }
    renderSession.spriteBatch.stop();
    if (this._mask)renderSession.maskManager.popMask(this._mask, renderSession);
    if (this._filters)renderSession.filterManager.popFilter();
    renderSession.spriteBatch.start();
  }
  else {
    for(i=0,j=this.drawCache.length; i<j; i++) {
      // this.children[i]._renderWebGL(renderSession);
      this.drawCache[i]._renderWebGL(renderSession);
    }
  }
};

// this method overrides PIXI.DisplayObjectContainer._renderCanvas
// only commented lines were changed
DisplayGroup.prototype._renderCanvas = function(renderSession) {

  if (this.visible === false || this.alpha === 0) return;

  if (this._cacheAsBitmap) {
    this._renderCachedSprite(renderSession);
    return;
  }

  if (this._mask) {
    renderSession.maskManager.pushMask(this._mask, renderSession);
  }

  for(var i=0, j=this.drawCache.length; i<j; i++) {
    // this.children[i]._renderCanvas(renderSession);
    this.drawCache[i]._renderCanvas(renderSession);
  }

  if (this._mask) {
    renderSession.maskManager.popMask(renderSession);
  }
};

DisplayGroup.prototype.addChildAt = function (child, index) {
  PIXI.DisplayObjectContainer.prototype.addChildAt.call(this,child,index);
  this.drawCache.length = 0;
  this._recursiveCache(this.children);
}

// this method overrides Phaser.Group.sort, only commented lines were changed
DisplayGroup.prototype.sort = function (key, order) {

  if (this.children.length < 2) return;

  if (typeof key === 'undefined') { key = 'z'; }
  if (typeof order === 'undefined') { order = Phaser.Group.SORT_ASCENDING; }

  this._sortProperty = key;

  if (order === Phaser.Group.SORT_ASCENDING) {
    // this.children.sort(this.ascendingSortHandler.bind(this));
    this.drawCache.sort(this.ascendingSortHandler.bind(this));
  }
  else {
    // this.children.sort(this.descendingSortHandler.bind(this));
    this.drawCache.sort(this.descendingSortHandler.bind(this));
  }
  this.updateZ();
};

// added for this class
DisplayGroup.prototype._recursiveCache = function (arrayToSort) {
  // recursive function that will stick all nested children sprites in the drawCache so they're on the same level
  for (var i = 0; i < arrayToSort.length; i++) {
    if (arrayToSort[i] instanceof Phaser.Group) {
      this._recursiveCache(arrayToSort[i].children);
    }
    else {
      this.drawCache.push(arrayToSort[i]);
    }
  }
};

module.exports = DisplayGroup
