import { InjectionToken } from '@angular/core';
import { ILuEstablishmentService, ILuLegalUnitService } from '../service';

export const DEFAULT_ESTABLISHMENT_SERVICE = new InjectionToken<ILuEstablishmentService>('Default establishment service');
export const DEFAULT_LEGAL_UNIT_SERVICE = new InjectionToken<ILuLegalUnitService>('Default legal unit service');
