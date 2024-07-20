import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserServiceService } from './services/user-service.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<UserServiceService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['checkAuthentication']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        { provide: UserServiceService, useValue: authServiceSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(UserServiceService) as jasmine.SpyObj<UserServiceService>;
    router = TestBed.inject(Router);
  });

  it('should return true for a logged-in user', () => {
    authService.getLoginState.and.returnValue(true);

    const result = authGuard.canActivate({} as any, {} as any);

    expect(result).toBeTrue();
  });

  it('should navigate to login for a logged-out user', () => {
    spyOn(router, 'navigate');
    authService.getLoginState.and.returnValue(false);

    const result = authGuard.canActivate({} as any, {} as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
