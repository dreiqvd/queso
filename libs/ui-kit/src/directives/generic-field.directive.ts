import { Directive, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Directive({
  selector: '[qsFormControl]',
  standalone: true,
})
export class GenericFormFieldDirective implements OnInit {
  /**
   * The control to be used in the directive. This can be a FormControl instance
   * or a string representing the name of the control in the parent form group.
   */
  @Input({ required: true }) control!: FormControl | string;

  /** The name of the field. This is also used for accessibility attributes. */
  @Input({ required: true }) name!: string;

  /**
   * The optional label to be used for the form field.
   */
  @Input() label?: string;

  /**
   * Whether the required marker should be hidden.
   */
  @Input() hideRequiredMarker = false;

  /**
   * The optional mapping for the error messages.
   * @example { required: 'Your custom required error message.' }
   */
  @Input() errorMsgMap: { [key: string]: string } = {};

  /** Holds the value of the error message string */
  errorMessage?: string;

  /**
   * The resolved form control instance to be used in the directive.
   */
  public formControl!: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.resolveControl();
  }

  private resolveControl(): void {
    // Immediately assign to formControl if control input is a FormControl instance.
    // Otherwise, attempt to resolve the control from the parent form group.
    if (this.control instanceof FormControl) {
      this.formControl = this.control;
    } else if (typeof this.control === 'string') {
      const group = this.controlContainer.control as FormGroup;
      this.formControl = group.get(this.control) as FormControl;
    }

    this.resolveValidationHandler();
  }

  /**
   * Subscribe to the status changes of the form control and resolve the error message
   */
  private resolveValidationHandler(): void {
    this.formControl.statusChanges
      .pipe(debounceTime(500))
      .subscribe((state) => {
        if (state === 'INVALID' && this.formControl.errors) {
          // At the moment, only one error message is displayed within the field.
          const errorKey = Object.keys(this.formControl.errors)[0];
          let errorMsg = '';
          if (this.errorMsgMap[errorKey]) {
            errorMsg = this.errorMsgMap[errorKey];
          } else if (
            DEFAULT_ERROR_MESSAGES[
              errorKey as keyof typeof DEFAULT_ERROR_MESSAGES
            ]
          ) {
            errorMsg =
              DEFAULT_ERROR_MESSAGES[
                errorKey as keyof typeof DEFAULT_ERROR_MESSAGES
              ];
          } else {
            console.error('No validation message found for error:', errorKey);
          }

          if (this.errorMessage !== errorMsg) {
            this.errorMessage = errorMsg;
          }
        }
      });
  }

  /**
   * Compute the value of the "required" field error message.
   */
  public checkRequiredMsg(): void {
    if (this.formControl.hasError('required')) {
      const errorMsg = this.errorMsgMap['required']
        ? this.errorMsgMap['required']
        : DEFAULT_ERROR_MESSAGES['required'];
      // Only assign new error message if it was not the same with the previous one.
      if (errorMsg !== this.errorMessage) {
        this.errorMessage = errorMsg;
      }
    }
  }

  /** Generic handle for blur event */
  public onBlur(): void {
    this.checkRequiredMsg();
  }
}

const DEFAULT_ERROR_MESSAGES = {
  required: 'This field is required.',
} as const;
