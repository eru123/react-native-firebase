import { makeObservable, observable, computed, action } from "mobx"

class Counter {
  count = 0;

  constructor(){
    makeObservable(this, {
      count: observable,
      value: computed,
      increment: action,
      decrement: action
    })    
  }

  get value(){
    return 'The train is delayed by' + this.count;
  };

  increment(x = 1){
    this.count += x;
  }

  decrement(){
    this.count--;
  }
}

export const counterStore = new Counter();
