'use client';
import Navbar from '@/main/components/layout/Navbar';
import Footer from '@/main/components/layout/Footer';
import ThemeWrapper from '@/main/components/style/ThemeWrapper';
import Background from '../../main/components/style/Background';
import '@/main/styles/styles.css';

export default function MainLayout(props) {
    const footerHeight = '140px';

    return (
        <ThemeWrapper>
            <Background>
                <Navbar />
                {props.children}
            </Background>
            <Footer height={footerHeight} />
        </ThemeWrapper>
    );
}
