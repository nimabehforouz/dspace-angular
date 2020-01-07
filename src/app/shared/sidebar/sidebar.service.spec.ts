import { Store } from '@ngrx/store';
import { SidebarService } from './sidebar.service';
import { AppState } from '../../app.reducer';
import { async, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';
import { SidebarCollapseAction, SidebarExpandAction } from './sidebar.actions';
import { HostWindowService } from '../host-window.service';

describe('SidebarService', () => {
  let service: SidebarService;
  const store: Store<AppState> = jasmine.createSpyObj('store', {
    /* tslint:disable:no-empty */
    dispatch: {},
    /* tslint:enable:no-empty */
    pipe: observableOf(true)
  });
  const windowService = jasmine.createSpyObj('hostWindowService',
    {
      isXs: observableOf(true),
      isSm: observableOf(false),
      isXsOrSm: observableOf(true)
    });
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      providers: [
        {
          provide: Store, useValue: store
        },
        {
          provide: HostWindowService, useValue: windowService
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = new SidebarService(store, windowService);
  }) ;

  describe('when the collapse method is triggered', () => {
    beforeEach(() => {
      service.collapse();
    });

    it('SidebarCollapseAction should be dispatched to the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SidebarCollapseAction());
    });

  });

  describe('when the expand method is triggered', () => {
    beforeEach(() => {
      service.expand();
    });

    it('SidebarExpandAction should be dispatched to the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SidebarExpandAction());
    });
  });

});