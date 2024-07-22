import { inject } from "@angular/core";
import { SELECTOR_WIDGET_DATA_PROVIDER_TOKEN } from "./selector-widget-token";
import { toSignal, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup } from "@angular/forms";
import { map, tap, distinctUntilChanged } from "rxjs";
interface SelectorForm {
  providers: FormControl<string | null>;
  instruments: FormControl<string | null>;
}

export abstract class AbstractSelectorWidget {
  public readonly dataProvider = inject(SELECTOR_WIDGET_DATA_PROVIDER_TOKEN, {skipSelf: true});
  public readonly fg = new FormGroup<SelectorForm>({
    providers: new FormControl<string | null>({ value: null, disabled: true }),
    instruments: new FormControl<string | null>({
      value: null,
      disabled: true,
    }),
  });

  public readonly providerOptions = toSignal(
    this.dataProvider.options$.pipe(
      map((options) => options?.providers?.data || []),
      tap((options) =>
        this.disableFromControlIfNoOptions('providers', options)
      ),
      takeUntilDestroyed()
    )
  );
  public readonly instrumentOptions = toSignal(
    this.dataProvider.options$.pipe(
      map((options) => options?.instruments?.data || []),
      tap((options) =>
        this.disableFromControlIfNoOptions('instruments', options)
      ),
      takeUntilDestroyed()
    )
  );

  constructor() {
   this.initFormFlow();
  }

  private disableFromControlIfNoOptions(
    controlName: keyof SelectorForm,
    options: any[]
  ) {
    const control = this.fg?.get(controlName);
    options?.length === 0 ? control?.disable() : control?.enable();
  }

  private initFormFlow() {
    this.fg
    .get('providers')
    ?.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed())
    .subscribe((provider) => {
      this.dataProvider.setProvider(provider);
      this.fg.get('instruments')?.setValue(null);
      this.fg.get('instruments')?.disable();
    });
    this.fg
    .get('instruments')
    ?.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed())
    .subscribe((instrument) => {
      this.dataProvider.setInstrument(instrument);
    });
  }

}
