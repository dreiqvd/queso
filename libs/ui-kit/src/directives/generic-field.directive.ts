import { Directive, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

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
  }
}
