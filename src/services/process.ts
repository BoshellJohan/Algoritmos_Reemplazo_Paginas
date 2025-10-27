import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Process {
  getProcessByID(id: number, processes: any[]): Promise<any> {
  return new Promise(resolve => {
    const result = processes.find(p => p.id === id);
    resolve(result);
  });
  }

  deleteProcess(id:number, processes:any[]): Promise<any>{
    return new Promise(resolve => {
      const result = processes.filter((p:any) => p.id.toLowerCase() != id)
      resolve(result);
    });
  }

  isValidProcess(process:any):boolean{
    let num = process['number'];

    if(num < 0){
      return false;
    } else {
      return true;
    }
  }

}
