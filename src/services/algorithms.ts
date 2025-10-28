import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Algorithms {
  cantidadMarcos: number = 3;

  // array = [
  //   {data:[1, 2], result: 'failed'}
  // ];


  getNumbers(processes: any) {
    return processes.map((p: any) => {
      return p.number;
    });
  }

  FIFO(processes: any[], framesAmount:number) {
    if(framesAmount) this.cantidadMarcos = framesAmount;
    const nums = this.getNumbers(processes);

    const frames = Array(this.cantidadMarcos).fill(null);
    const queue: number[] = []; // índices de entrada FIFO
    const result: any[] = [];

    let nextFree = 0;

    nums.forEach((p: any) => {
      // ¿Entra?
      const idxHit = frames.indexOf(p);
      if (idxHit !== -1) {
        // SUCCESS — no sale nadie
        result.push({ data: [...frames], result: 'success' });
        return;
      }

      // MISS — hay que meter p
      if (nextFree < this.cantidadMarcos) {
        // Aún hay huecos
        frames[nextFree] = p;
        queue.push(nextFree);
        nextFree++;
      } else {
        // lleno → expulsar FIFO
        const idx = queue.shift()!;
        frames[idx] = p;
        queue.push(idx);
      }

      result.push({ data: [...frames], result: 'failed' });
    });

    return result;
  }

  resetearBit(bit: any) {
    bit = bit.map((p: any) => {
      return (p = null);
    });

    return bit;
  }

  allNull(bit:any){
    let allNull = bit.every((p:any) => p == null);
    return allNull;
  }

  BIT(processes: any[], framesAmount:number) {
    if(framesAmount) this.cantidadMarcos = framesAmount;
    const nums = this.getNumbers(processes);

    const frames = Array(this.cantidadMarcos).fill(null);
    const queue: any = []; // índices de entrada

    let bit = Array(this.cantidadMarcos).fill(null);

    const result: any[] = [];

    let nextFree = 0;

    nums.forEach((p: any) => {
      // ¿Entra?
      const idxHit = frames.indexOf(p);
      if (idxHit !== -1) {
        // SUCCESS — no sale nadie
        let idxFrame = frames.indexOf(p);
        bit = this.resetearBit(bit);
        bit[idxFrame] = 1; //Se almacena un '1' en la posición donde está el 'p' dentro del marco.

        result.push({ data: [...frames], result: 'success' });
        return;
      }

      // MISS — hay que meter p
      if (nextFree < this.cantidadMarcos) {
        // Aún hay huecos
        frames[nextFree] = p;
        queue.push(nextFree);
        nextFree++;
      } else {
        // lleno → expulsar

        if(this.allNull(bit)){
          //No hay bit de referencia
          let idx = queue.shift()!;
          frames[idx] = p;
          queue.push(idx);
        } else {
          //Hay bit de referencia
          let idx = queue.shift()!;

          if(bit[idx] == 1){
            //Se desea sacar el proceso con el bit de referencia
            let nextIdx = queue.shift()!;
            queue.unshift(idx);
            frames[nextIdx] = p;
            queue.push(nextIdx);
            bit = this.resetearBit(bit);
          } else {
            //Se desea sacar otro proceso
            frames[idx] = p;
            queue.push(idx);
          }
        }
      }

      result.push({ data: [...frames], result: 'failed' });
    });

    return result;
  }

  bitArray(processes: any[], framesAmount:number) {
    if(framesAmount) this.cantidadMarcos = framesAmount;
    const nums = this.getNumbers(processes);

    const frames = Array(this.cantidadMarcos).fill(null);
    const queue: any = []; // índices de entrada

    let bit = Array(this.cantidadMarcos).fill(null);

    const result: any[] = [];

    let nextFree = 0;

    nums.forEach((p: any) => {
      // ¿Entra?
      const idxHit = frames.indexOf(p);
      if (idxHit !== -1) {
        // SUCCESS — no sale nadie
        let idxFrame = frames.indexOf(p);
        bit = this.resetearBit(bit);
        bit[idxFrame] = 1; //Se almacena un '1' en la posición donde está el 'p' dentro del marco.

        result.push([...bit]);
        return;
      }

      // MISS — hay que meter p
      if (nextFree < this.cantidadMarcos) {
        // Aún hay huecos
        frames[nextFree] = p;
        queue.push(nextFree);
        nextFree++;
      } else {
        // lleno → expulsar

        if(this.allNull(bit)){
          //No hay bit de referencia
          let idx = queue.shift()!;
          frames[idx] = p;
          queue.push(idx);
        } else {
          //Hay bit de referencia
          let idx = queue.shift()!;

          if(bit[idx] == 1){
            //Se desea sacar el proceso con el bit de referencia
            let nextIdx = queue.shift()!;
            queue.unshift(idx);
            frames[nextIdx] = p;
            queue.push(nextIdx);
            bit = this.resetearBit(bit);
          } else {
            //Se desea sacar otro proceso
            frames[idx] = p;
            queue.push(idx);
          }
        }
      }

      result.push([...bit]);
    });

    return result;
  }

  deleteIdx(queue: any, idx: number) {
    let idxValue = queue[idx];
    let newQueue = queue.slice(0, idx).concat(queue.slice(idx + 1));

    newQueue.push(idxValue);
    return newQueue;
  }

  LRU(processes: any[], framesAmount:number) {
    if(framesAmount) this.cantidadMarcos = framesAmount;
    const nums = this.getNumbers(processes);

    const frames = Array(this.cantidadMarcos).fill(null);
    let queue: number[] = []; // índices de entrada

    const result: any[] = [];

    let nextFree = 0;

    nums.forEach((p: any) => {
      // ¿Entra?
      const idxHit = frames.indexOf(p);
      if (idxHit !== -1) {
        // SUCCESS — no sale nadie

        let idxFrame = frames.indexOf(p);

        let idxQueue = queue.indexOf(idxFrame);
        queue = this.deleteIdx(queue, idxQueue);
        // console.log(queue);

        result.push({ data: [...frames], result: 'success' });
        return;
      }

      // MISS — hay que meter p
      if (nextFree < this.cantidadMarcos) {
        // Aún hay huecos
        frames[nextFree] = p;
        queue.push(nextFree);
        nextFree++;
      } else {
        // lleno → expulsar

        const idx = queue.shift()!;
        frames[idx] = p;
        queue.push(idx);
      }

      result.push({ data: [...frames], result: 'failed' });
    });

    return result;
  }

  MRU(processes: any[], framesAmount:number) {
    if(framesAmount) this.cantidadMarcos = framesAmount;
    const nums = this.getNumbers(processes);

    const frames = Array(this.cantidadMarcos).fill(null);
    let queue: number[] = []; // índices de entrada

    const result: any[] = [];

    let nextFree = 0;

    nums.forEach((p: any) => {
      // ¿Entra?
      const idxHit = frames.indexOf(p);
      if (idxHit !== -1) {
        // SUCCESS — no sale nadie

        let idxFrame = frames.indexOf(p);
        let idxQueue = queue.indexOf(idxFrame);
        queue = this.deleteIdx(queue, idxQueue);

        result.push({ data: [...frames], result: 'success' });
        return;
      }

      // MISS — hay que meter p
      if (nextFree < this.cantidadMarcos) {
        // Aún hay huecos
        frames[nextFree] = p;
        queue.push(nextFree);
        nextFree++;
      } else {
        // lleno → expulsar

        const idx = queue.pop()!;
        frames[idx] = p;
        queue.push(idx);
      }

      result.push({ data: [...frames], result: 'failed' });
    });

    return result;
  }
}
