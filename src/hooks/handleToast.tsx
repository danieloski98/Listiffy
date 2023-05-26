import React from 'react'
import { useToast } from '../State/Toast.state';

interface IOptions {
    message: string;
    preset?: 'success' | 'failure' | 'general' | 'offline'
}

const handleToast = () => {
    const { setMessage, setShowToast, setPreset } = useToast((state) => state);
    const ShowToast = React.useCallback(({ message, preset = 'general' }: IOptions) => {
        setMessage(message);
        setPreset(preset);
        setShowToast(true);
    }, []);

    const CloseToast = React.useCallback(() => {
        setMessage('');
        setShowToast(false);
    }, []);
  return {
    ShowToast,
    CloseToast,
  }
}

export default handleToast