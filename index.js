function LetterB() {
    const canvas = document.getElementById('glcanvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error('WebGL2 not supported');
        return;
    }


    const letterVertices = [
        -0.4, 0.5,
        -0.4, -0.5,
        -0.2, -0.5,

        -0.4, 0.5,
        -0.2, -0.5,
        -0.2, 0.5,

        -0.4, 0.5,
        -0.4, 0.3,
        0.4, 0.3,

        -0.4, 0.5,
        0.4, 0.3,
        0.4, 0.5,

        -0.2, -0.1,
        -0.2, 0.0,
        0.3, 0.0,

        -0.2, -0.1,
        0.3, -0.1,
        0.3, 0.0,

        -0.3, -0.5,
        0.3, -0.4,
        0.3, -0.5,

        -0.3, -0.5,
        0.3, -0.4,
        -0.3, -0.4,

        0.4, 0,
        0.3, -0.5,
        0.4, -0.4,

        0.3, 0,
        0.3, -0.5,
        0.4, -0,
    ];

    const letterGeoCpuBuffer = new Float32Array(letterVertices);

    const letterGeoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, letterGeoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, letterGeoCpuBuffer, gl.STATIC_DRAW);


    const vertexShaderSourceCode = `#version 300 es
    precision mediump float;
    
    in vec2 vertexPosition;
    uniform vec2 uTranslation;
    
    void main() {
        vec2 position = vertexPosition + uTranslation;
        gl_Position = vec4(position, 0.0, 1.0);
    }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSourceCode);
    gl.compileShader(vertexShader);


    const fragmentShaderSourceCode = `#version 300 es
    precision mediump float;
    
    out vec4 outputColor;
    
    void main() {
        outputColor = vec4(0.3, 0.4, 0.1, 1.0);
    }`;

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
    gl.compileShader(fragmentShader);


    const letterProgram = gl.createProgram();
    gl.attachShader(letterProgram, vertexShader);
    gl.attachShader(letterProgram, fragmentShader);
    gl.linkProgram(letterProgram);


    const vertexPositionAttributeLocation = gl.getAttribLocation(letterProgram, 'vertexPosition');
    const translationLocation = gl.getUniformLocation(letterProgram, 'uTranslation');


    let startPosition = -2.0;
    let frameId;

    function render() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;


        gl.clearColor(0.7, 0.6, 0.9, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.useProgram(letterProgram);


        startPosition += 0.01;

        if (startPosition > 2.0) {
            startPosition = -2.0;
        }

        gl.uniform2f(translationLocation, startPosition, 0.0);

        gl.enableVertexAttribArray(vertexPositionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, letterGeoBuffer);
        gl.vertexAttribPointer(vertexPositionAttributeLocation, 2, gl.FLOAT, false, 0, 0
        );

        gl.drawArrays(gl.TRIANGLES, 0, 32);


        frameId = requestAnimationFrame(render);
    }


    render();

}
window.onload
LetterB();


