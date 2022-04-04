import { TestBed, inject } from '@angular/core/testing';

import { SalaService } from './sala.service';

describe('SalaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SalaService]
        });
    });

    it('should ...', inject([SalaService], (service: SalaService) => {
        expect(service).toBeTruthy();
    }));
});
