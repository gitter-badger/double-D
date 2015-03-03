/**
 * Created by mohsom on 16.02.2015.
 */
'use strict';
function LocalStorage() {
  var th = this;

  this.init = function () {
    $('#cart_number').html(th.getNumbers());
  };
  this.set = function (name, value) {
    if (!th.check()) {
      return false;
    }
    localStorage.setItem(name, JSON.stringify(value));
    return true;
  };
  this.get = function (name) {
    if (!th.check()) {
      return false;
    }
    var cart = localStorage.getItem(name);
    return JSON.parse(cart);
  };
  this.delete = function (name) {
    if (!th.check()) {
      return false;
    }
    localStorage.removeItem(name);
  };
  this.check = function () {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };
  this.getNumbers = function () {
    var data = th.get('shopping_cart');
    var number = 0;
    $(data).each(function () {
      number += this.number;
    });
    $('#cart_number').html(number);
    return number;
  };
  this.addToCart = function (data, number) {
    var cart = th.get('shopping_cart');
    if (!cart) {
      cart = [];
    }
    var exist = false;
    $(cart).each(function () {
      if (this.item.id === data.id) {
        this.number += number;
        exist = true;
        return;
      }
    });
    if (!exist) {
      cart.push({item: data, number: number});
    }
    th.set('shopping_cart', cart);
    th.getNumbers();
  };
  this.getCategories=function(){
    var ctgs=th.get('products_categories');
    return ctgs;
  };
  this.addCategories=function(data){
    var ctgs=th.get('products_categories');
    ctgs.push(data);
  };
  this.init();
}
