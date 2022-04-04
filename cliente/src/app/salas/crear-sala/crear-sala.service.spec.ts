import { TestBed, inject } from '@angular/core/testing';

import { CrearSalaService } from './crear-sala.service';

describe('CrearSalaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrearSalaService]
        });
    });

    it('should ...', inject([CrearSalaService], (service: CrearSalaService) => {
        expect(service).toBeTruthy();
    }));
});
