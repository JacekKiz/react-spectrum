/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {classNames} from '@react-spectrum/utils';
import {FocusRing} from '@react-aria/focus'; 
import {mergeProps} from '@react-aria/utils';
import React, {RefObject, useCallback} from 'react';
import {SpectrumFieldProps} from '@react-types/label';
import styles from '@adobe/spectrum-css-temp/components/textfield/vars.css';
import {useFormProps} from '@react-spectrum/form';
import {useHover} from '@react-aria/interactions';
import {useLayoutEffect} from '@react-aria/utils';


function ReadOnlyField(props: SpectrumFieldProps, ref: RefObject<HTMLInputElement | HTMLTextAreaElement>) {
  props = useFormProps(props);
  let {
    isDisabled,
    readOnlyText,
    inputProps,
    autoFocus
  } = props;

  let {hoverProps, isHovered} = useHover({isDisabled});

  let onHeightChange = useCallback(() => {
    let input = ref.current;
    let prevAlignment = input.style.alignSelf;
    input.style.alignSelf = 'start';
    input.style.height = `${input.scrollHeight}px`;
    input.style.alignSelf = prevAlignment;
  }, [ref]);

  useLayoutEffect(() => {
    if (ref.current) {
      onHeightChange();
    }
  }, [onHeightChange, ref]);

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')} isTextInput autoFocus={autoFocus}>        
      <textarea
        {...mergeProps(inputProps, hoverProps)} 
        ref={ref as any}
        value={readOnlyText}
        className={
          classNames(
            styles,
            'spectrum-Textfield-input',
            {
              'is-hovered': isHovered
            }
          )
      } />
    </FocusRing> 
  );
}

let _ReadOnlyField = React.forwardRef(ReadOnlyField);
export {_ReadOnlyField as ReadOnlyField};
