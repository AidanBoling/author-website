'use client';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ResponsiveImageContainer from '@/main/components/ResponsiveImageContainer';

function About() {
    return (
        <Box
            sx={{
                width: '100%',
            }}>
            <ResponsiveImageContainer
                marginSize="2rem"
                float="left"
                breakpoint="md">
                <Image
                    src="https://picsum.photos/300/350?random=1"
                    alt="image of the author"
                    height={350}
                    width={300}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '.15rem',
                    }}></Image>
            </ResponsiveImageContainer>
            <Typography>
                Jane Austen is a lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Quisque condimentum, lacus sit amet laoreet
                consectetur, arcu enim ullamcorper eros, venenatis porttitor
                sapien risus eget nunc. Vivamus eu est a erat elementum iaculis
                non nec quam. Duis at dolor at mi condimentum pulvinar. Nam quis
                lobortis leo, consectetur luctus ligula. Duis non risus a ex
                finibus luctus. Quisque sodales felis et est fringilla, in
                tincidunt dui dictum. Nullam quis lacus ut nulla sollicitudin
                tristique. Aenean aliquet iaculis varius.
            </Typography>
            <Typography>
                Sed vel eros vel purus ornare pellentesque. In aliquam ac lacus
                sit amet consequat. Mauris congue blandit metus. Phasellus
                elementum sapien quis lectus pharetra rhoncus. Aenean
                consectetur, ipsum non pulvinar rutrum, ligula enim consequat
                metus, nec ultricies ante ante sed nunc. Mauris enim nunc,
                luctus nec erat vel, feugiat egestas erat. Cras nec fringilla
                orci. Aliquam commodo sit amet velit a aliquet. Ut rhoncus
                bibendum feugiat. Proin et aliquet leo, ut sollicitudin quam.
            </Typography>
            <Typography>
                Nunc dapibus arcu nec sem convallis, mollis ultricies est
                sodales. Curabitur a leo sit amet est egestas iaculis. Nunc
                feugiat quis risus sed euismod. Integer dolor quam, pretium sit
                amet metus interdum, rhoncus varius nibh. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Nulla tempor lectus sed
                nunc laoreet euismod. Pellentesque viverra ligula ac neque
                congue tristique. Duis bibendum venenatis metus porta molestie.
                Maecenas dapibus felis a eros hendrerit sollicitudin. Curabitur
                varius diam ac volutpat imperdiet. Cras ullamcorper orci vitae
                mauris ultricies ornare.
            </Typography>
            <ResponsiveImageContainer
                marginSize="2rem"
                float="right"
                breakpoint="sm">
                <Image
                    src="https://picsum.photos/300/350?random=2"
                    alt="image of the author"
                    height={350}
                    width={300}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '.15rem',
                    }}></Image>
            </ResponsiveImageContainer>
            <Typography>
                Vestibulum a purus vestibulum, lobortis ex ullamcorper, vehicula
                turpis. Duis sit amet vestibulum odio. Aenean feugiat facilisis
                posuere. Maecenas a vehicula nunc. Donec mollis mauris
                scelerisque, varius sapien in, eleifend magna. Mauris nulla dui,
                varius at pretium vitae, malesuada id nisl. Fusce venenatis odio
                tellus, egestas porta velit vehicula nec. Proin condimentum
                ultricies sem, eget molestie metus accumsan eu. In venenatis
                erat mattis nibh iaculis ornare. Proin facilisis ultricies
                blandit. In hac habitasse platea dictumst. Praesent non
                venenatis felis. Nullam in luctus sem. Nulla facilisi. Proin vel
                mi sit amet sapien lobortis euismod.
            </Typography>

            <Typography>
                Curabitur enim est, convallis at porttitor sed, rhoncus sed
                metus. Vestibulum a mi sit amet sem mollis euismod eget quis mi.
                Sed quis fermentum tortor. Nullam aliquet viverra lorem. Sed eu
                vehicula purus, vel rutrum nunc. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                Maecenas nisl orci, malesuada eu pulvinar sed, molestie eget
                augue. Fusce mattis diam et fermentum eleifend.
            </Typography>
        </Box>
    );
}

export default About;
