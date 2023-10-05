'use client';
import { useState, useCallback } from 'react';
import {
    Box,
    Container,
    Paper,
    Button,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PageTitle from './PageTitle';
import InnerPageContainer, { pagePaddingX } from './InnerPageContainer';
import Pagination from '@mui/material/Pagination';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const pageLimitOptions = ['10', '20', '30'];

function PageWrapper(props) {
    const initialPageLimitOption = props.pagination
        ? pageLimitOptions.indexOf(props.pagination.pageLimit) !== -1
            ? pageLimitOptions.indexOf(props.pagination.pageLimit)
            : 0
        : 0;

    const [page, setPage] = useState(
        props.pagination ? Number(props.pagination.page) : ''
    );
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(initialPageLimitOption);
    const open = Boolean(anchorEl);

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

    function handlePageChange(event, value) {
        // console.log('Page: ' + value);
        const url = pathname + '?' + createQueryString('page', value);
        setPage(value);

        // Added "#listtop" as a janky workaround to get it to scroll to top of results list.
        // Uncertain why this works, however -- only this particular name seems to work, and there's no matching element id
        router.push(url + '#listtop');
        router.replace(url);
        console.log(url);
    }

    function handleLimitChange(value) {
        const url = pathname + '?' + createQueryString('limit', value);
        router.replace(url, { scroll: false });
        console.log(url);
    }

    function handleLimitButtonClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handlePageLimitSelect(event, index) {
        if (selectedIndex !== index) {
            setSelectedIndex(index);
            handleLimitChange(pageLimitOptions[index]);
        }
        handleLimitMenuClose();
    }

    function handleLimitMenuClose() {
        setAnchorEl(null);
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
                            display: 'grid',
                            gridTemplateColumns: '1fr 11fr',
                            gridTemplateRows: '1fr',
                            mt: '4rem',
                        }}>
                        <Tooltip title="Items per page">
                            <Button
                                id="page-limit-button"
                                aria-controls={
                                    open ? 'page-limit-menu' : undefined
                                }
                                aria-haspopup="listbox"
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="Set number of items per page"
                                onClick={handleLimitButtonClick}
                                variant="outlined"
                                color="grey"
                                sx={{
                                    backgroundColor: 'forestgreenAlpha10.main',
                                    gridArea: '1 / 1 / 1 / 1',
                                    justifySelf: 'flex-start',
                                    alignSelf: 'flex-start',
                                }}>
                                {pageLimitOptions[selectedIndex]}
                                <ArrowDropDownIcon
                                    fontSize="medium"
                                    sx={{ ml: '.3rem', mr: '-.5rem' }}
                                />
                            </Button>
                        </Tooltip>
                        <Menu
                            id="page-limit-menu"
                            // aria-labelledby="page-limit-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleLimitMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'page-limit-button',
                                role: 'listbox',
                                dense: true,
                                sx: {
                                    '&& .Mui-selected': {
                                        backgroundColor: 'greyAlpha50.main',
                                    },
                                },
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                horizontal: 'left',
                            }}>
                            {pageLimitOptions.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={event =>
                                        handlePageLimitSelect(event, index)
                                    }>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Pagination
                            count={props.pagination.totalPages}
                            page={page}
                            onChange={handlePageChange}
                            size="medium"
                            sx={{
                                gridArea: '1 / 1 / -1 / -1',
                                justifySelf: 'center',
                            }}
                        />
                    </Box>
                )}
            </InnerPageContainer>
        </Container>
    );
}

export default PageWrapper;
