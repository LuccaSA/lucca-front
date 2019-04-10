import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BogusModule } from './bogus';

const routes: Routes = [
	{ path: 'bogus', loadChildren: () => BogusModule },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRouter { }
