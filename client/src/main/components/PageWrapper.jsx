'use client';
import { useState, useCallback } from 'react';
import { Box, Container, Paper } from '@mui/material';
import PageTitle from './PageTitle';
import InnerPageContainer, { pagePaddingX } from './InnerPageContainer';
import Pagination from '@mui/material/Pagination';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function PageWrapper(props) {
    const [page, setPage] = useState(
        props.pagination ? Number(props.pagination.page) : ''
    );

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    function handleChange(event, value) {
        // console.log('Page: ' + value);
        const url = pathname + '?' + createQueryString('page', value);
        setPage(value);
        // the "#listtop" is a janky workaround to get it to scroll to top of results list.
        router.push(url + '#listtop');
        router.replace(url);
        console.log(url);
        // router.push(`${pathname}?${searchParams}`, { scroll: false })
    }

    return (
        <Container
            className="main"
            sx={{ my: '1.5rem', pb: { md: '3rem' }, flexGrow: 0 }}>
            {props.header && <PageTitle title={props.header} />}
            <InnerPageContainer className="content">
                {props.children}
                {props.pagination && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: '4rem',
                        }}>
                        <Pagination
                            count={props.pagination.totalPages}
                            page={page}
                            size="medium"
                            onChange={handleChange}
                        />
                    </Box>
                )}
            </InnerPageContainer>
        </Container>
    );
}

export default PageWrapper;
