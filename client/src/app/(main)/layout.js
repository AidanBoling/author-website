'use client';
import Navbar from '@/main/components/Navbar';
import Footer from '@/main/components/Footer';
import ThemeWrapper from '@/main/components/style/ThemeWrapper';
import Background from '../../main/components/style/Background';
import '@/main/styles/styles.css';

export default function MainLayout(props) {
    const footerHeight = '200px';

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
