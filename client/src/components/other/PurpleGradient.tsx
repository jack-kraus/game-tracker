import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config';

const fullConfig : any = resolveConfig(tailwindConfig);

export default function PurpleGradient() {
    const primary = fullConfig.theme.colors.primary;
    const scale = fullConfig.theme.colors.scale[100];

    return <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor={primary} offset="50%" />
            <stop stopColor={scale} offset="50%" />
        </linearGradient>
    </svg>;
}