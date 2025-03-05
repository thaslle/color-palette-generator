#define M_PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform int uIsMobile;
uniform float uBlurProgress;
uniform float uColorProgress;
uniform float uControlsProgress;
uniform float uPaddingBottom;
uniform float uUserBlur;
uniform float uMotionBlur;
uniform vec3 uPrevColor1;
uniform vec3 uPrevColor2;
uniform vec3 uPrevColor3;
uniform vec3 uPrevColor4;
uniform vec3 uPrevColor5;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;

void main() {
    // Set the current color as the base color.
    vec3 baseColor = vec3(0.0);
    vec3 shadeColor = vec3(0.0);
    
    // Set the width for each stripe (each stripe occupies 1/5 of the width)
    float stripeWidth = 1.0 / 5.0;
    float userBlur = uUserBlur * 0.001 + 0.001;
    float motionBlur = uMotionBlur * 0.001 + 0.001;

    // Set base radius
    float radius = mix(userBlur, motionBlur, uBlurProgress);

    // Smooth transitions for each stripe using smoothstep
    float stripe1, stripe2, stripe3, stripe4, stripe5;

    if(uIsMobile == 1) {
        
        // Define your heights for each stripe as fractions of the total height
        // float sh1 = mix(0.2, 0.175, uControlsProgress);
        // float sh2 = mix(0.4, 0.35, uControlsProgress);
        // float sh3 = mix(0.6, 0.525, uControlsProgress);
        // float sh4 = mix(0.8, 0.70, uControlsProgress);

        float row = (1.0 - uPaddingBottom) / 5.0;

        float sh1 = mix(0.2, row, uControlsProgress);
        float sh2 = mix(0.4, row * 2.0, uControlsProgress);
        float sh3 = mix(0.6, row * 3.0, uControlsProgress);
        float sh4 = mix(0.8, row * 4.0, uControlsProgress);

        //uPaddingBottom
        float sh5 = 1.0;
        
        stripe1 = smoothstep(sh1 - radius, sh1 + radius, 1.0-vUv.y);
        stripe2 = smoothstep(sh2 - radius, sh2 + radius, 1.0-vUv.y);
        stripe3 = smoothstep(sh3 - radius, sh3 + radius, 1.0-vUv.y);
        stripe4 = smoothstep(sh4 - radius, sh4 + radius, 1.0-vUv.y);
        stripe5 = smoothstep(sh5 - radius, sh5 + radius, 1.0-vUv.y);

    } else {
        
        // Desktop: Use vUv.x as threshold
        stripe1 = smoothstep(stripeWidth * 1.0 - radius, stripeWidth * 1.0 + radius, vUv.x);
        stripe2 = smoothstep(stripeWidth * 2.0 - radius, stripeWidth * 2.0 + radius, vUv.x);
        stripe3 = smoothstep(stripeWidth * 3.0 - radius, stripeWidth * 3.0 + radius, vUv.x);
        stripe4 = smoothstep(stripeWidth * 4.0 - radius, stripeWidth * 4.0 + radius, vUv.x);
        stripe5 = smoothstep(stripeWidth * 5.0 - radius, stripeWidth * 5.0 + radius, vUv.x);

    }   



    // Interpolate the colors based on smoothstep results
    shadeColor = mix(uColor1, uColor2, stripe1);
    shadeColor = mix(shadeColor, uColor3, stripe2);
    shadeColor = mix(shadeColor, uColor4, stripe3);
    shadeColor = mix(shadeColor, uColor5, stripe4);
    shadeColor = mix(shadeColor, uColor5, stripe5);  // This overwrites the final color after all blends

    baseColor = mix(uPrevColor1, uPrevColor2, stripe1);
    baseColor = mix(baseColor, uPrevColor3, stripe2);
    baseColor = mix(baseColor, uPrevColor4, stripe3);
    baseColor = mix(baseColor, uPrevColor5, stripe4);
    baseColor = mix(baseColor, uPrevColor5, stripe5);  // This overwrites the final color after all blends

    // Final color with smooth progress blending
    vec3 color = mix(baseColor, shadeColor, uColorProgress);    

    // Output the final color
    csm_DiffuseColor = vec4(color, 1.0);
}
