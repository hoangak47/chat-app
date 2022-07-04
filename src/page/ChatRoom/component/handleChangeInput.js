function HandleChangeInput(input, label) {
    if (input.current.value.length !== 0 || input.current.value !== '') {
        label.current.style.top = '-10%';
        label.current.style.opacity = '0.8';
        label.current.style.left = '0';
        label.current.style.transform = 'scale(0.7)';
    } else {
        label.current.style.top = '50%';
        label.current.style.opacity = '0.5';
        label.current.style.left = '10px';
        label.current.style.transform = 'translateY(-50%)';
    }
}

export default HandleChangeInput;
