import { BogusModule } from './bogus';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: 'bogus', loadChildren: () => BogusModule },
];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IssuesRouter { }
