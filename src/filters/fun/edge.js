function edge(width, height) {
    gl.edge = gl.edge || new Shader(null, '\
    uniform sampler2D texture;\
    varying vec2 texCoord;\
    uniform float width;\
    uniform float height;\
    void main()\
    {\
      vec2 pos = vec2(texCoord.x, texCoord.y);\
      vec2 onePixel = vec2(1, 1) / vec2(width, height);\
      vec4 color = vec4(0);\
      mat3 edgeDetectionKernel = mat3(\
        -1, -1, -1,\
        -1, 8, -1,\
        -1, -1, -1\
      );\
      for(int i = 0; i < 3; i++) {\
        for(int j = 0; j < 3; j++) {\
            vec2 samplePos = pos + vec2(i - 1 , j - 1) * onePixel;\
            vec4 sampleColor = texture2D(texture, samplePos);\
            sampleColor *= edgeDetectionKernel[i][j];\
            color += sampleColor;\
        }\
      }\
      color.a = 1.0;\
      gl_FragColor = color;\
    }\
    ');



    simpleShader.call(this, gl.edge, {
        width: width,
        height: height
    });

    return this;
}
