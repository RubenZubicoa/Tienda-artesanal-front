import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EAplicacionesPermissions } from '../../../core/enums/pages-permissions/aplicaciones-permissions';
import { of } from 'rxjs';

const route = {
  path: '',
  data: { breadcrumb: 'Inicio' },
  children: [
    {
      path: 'serie',
      title: 'Series',
      data: {
        breadcrumb: 'Series documentales',
      },
    },
  ]
};

describe('Breadcrumbs component', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            root: {
              children: [],
            },
            snapshot: {
              params: {},
              queryParams: {
                pageIndex: 1,
              },
              data: {
                breadcrumb: 'Aplicaciones',
                permission: EAplicacionesPermissions.APP_CONS,
                permissionsOfSection: {
                  read: EAplicacionesPermissions.APP_CONS,
                  update: EAplicacionesPermissions.APP_UPDT,
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('El componente deberia de estar creado', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('deberia de crear los breadcrumbs', () => {
        component.ngOnInit();
        expect(component.breadcrumbs).toEqual([])
    })
  })

  describe('navigate', () => {
    it('deberia de llamar a navigateByUrl', () => {
        const url = 'app/aplicaciones';
        component.navigate(url);
        expect(router.navigateByUrl).toHaveBeenCalledWith(url)
    })
  })

  describe('createBreadcrumbs', () => {
    it('deberia retornar un array vacio cuando no hay hijos', () => {
      const routeWithoutChildren: any = {
        children: []
      };
      const breadcrumbs = (component as any).createBreadcrumbs(routeWithoutChildren);
      expect(breadcrumbs).toEqual([]);
    });

    it('deberia crear breadcrumbs para rutas anidadas', () => {
      const nestedRoute: any = {
        children: [
          {
            routeConfig: {
              path: 'aplicaciones',
              data: { breadcrumb: 'Aplicaciones' }
            },
            children: [
              {
                routeConfig: {
                  path: 'serie',
                  data: { breadcrumb: 'Series' }
                },
                children: []
              }
            ]
          }
        ]
      };
      const breadcrumbs = (component as any).createBreadcrumbs(nestedRoute);
      expect(breadcrumbs).toEqual([
        {
          label: 'Aplicaciones',
          url: 'app/aplicaciones'
        },
        {
          label: 'Series',
          url: 'app/serie'
        }
      ]);
    });

    it('no deberia agregar breadcrumbs para rutas sin breadcrumb data', () => {
      const routeWithoutBreadcrumb: any = {
        children: [
          {
            routeConfig: {
              path: 'aplicaciones',
              data: { breadcrumb: 'Aplicaciones' }
            },
            children: [
              {
                routeConfig: {
                  path: 'serie',
                  data: {}
                },
                children: []
              }
            ]
          }
        ]
      };
      const breadcrumbs = (component as any).createBreadcrumbs(routeWithoutBreadcrumb);
      expect(breadcrumbs).toEqual([
        {
          label: 'Aplicaciones',
          url: 'app/aplicaciones'
        }
      ]);
    });

    it('deberia manejar rutas con path vacio', () => {
      const routeWithEmptyPath: any = {
        children: [
          {
            routeConfig: {
              path: '',
              data: { breadcrumb: 'Inicio' }
            },
            children: [
              {
                routeConfig: {
                  path: 'aplicaciones',
                  data: { breadcrumb: 'Aplicaciones' }
                },
                children: []
              }
            ]
          }
        ]
      };
      const breadcrumbs = (component as any).createBreadcrumbs(routeWithEmptyPath);
      expect(breadcrumbs).toEqual([
        {
          label: 'Inicio',
          url: 'app'
        },
        {
          label: 'Aplicaciones',
          url: 'app/aplicaciones'
        }
      ]);
    });

    it('no deberia agregar breadcrumbs para rutas sin routeConfig', () => {
      const routeWithoutConfig: any = {
        children: [
          {
            routeConfig: null,
            children: []
          }
        ]
      };
      const breadcrumbs = (component as any).createBreadcrumbs(routeWithoutConfig);
      expect(breadcrumbs).toEqual([]);
    });

    it('deberia acumular breadcrumbs cuando se pasa un array inicial', () => {
      const initialBreadcrumbs = [
        {
          label: 'Home',
          url: 'app/home'
        }
      ];
      const routeWithChild: any = {
        children: [
          {
            routeConfig: {
              path: 'aplicaciones',
              data: { breadcrumb: 'Aplicaciones' }
            },
            children: []
          }
        ]
      };
      const breadcrumbs = (component as any).createBreadcrumbs(routeWithChild, '', initialBreadcrumbs);
      expect(breadcrumbs).toEqual([
        {
          label: 'Home',
          url: 'app/home'
        },
        {
          label: 'Aplicaciones',
          url: 'app/aplicaciones'
        }
      ]);
    });
  })
});
