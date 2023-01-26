import classNames from 'classnames/bind';
import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import styles from './TextArea.module.scss';

const cx = classNames.bind(styles);

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ value, className = '', ...props }: TextAreaProps) => {
  const classes = cx('textArea-container', {
    [className]: className
  });
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [value]);

  return <textarea className={classes} value={value} ref={textAreaRef} {...props} />;
};

export default TextArea;
