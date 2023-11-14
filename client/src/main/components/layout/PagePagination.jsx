'use client';
import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Pagination from '@mui/material/Pagination';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { pageLimitOptions } from '@/main/utils/pageLimitOptions';
import DividerStyled from '../DividerStyled';

export default function PagePagination(props) {
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

    useEffect(() => {
        const totalPages = props.pagination
            ? Number(props.pagination.totalPages)
            : '';
        // Auto-correct page number if a new page limit reduces total pages below current page number
        if (page > totalPages) {
            const url = pathname + '?' + createQueryString('page', totalPages);
            setPage(totalPages);
            router.replace(url);
        }
    }, [searchParams]);

    function handlePageChange(event, value) {
        // console.log('Page: ' + value);
        const url = pathname + '?' + createQueryString('page', value);
        setPage(value);

        // Added "#listtop" as a janky workaround to get it to scroll to top of results list.
        // Uncertain why this works, however -- only this particular name seems to work, and there's no matching element id
        router.push(url + '#listtop');
        router.replace(url);
        // console.log(url);
    }

    function handleLimitChange(value) {
        const url = pathname + '?' + createQueryString('limit', value);
        router.replace(url);
        // console.log(url);
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
    if (!props.pagination) return null;
    return (
        <Box mt={'4rem'}>
            <DividerStyled sx={{ width: '100%', marginBottom: '1.5rem' }} />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 11fr',
                    gridTemplateRows: '1fr',
                    mt: '.5rem',
                }}>
                <Tooltip title="Items per page">
                    <Button
                        id="page-limit-button"
                        aria-controls={open ? 'page-limit-menu' : undefined}
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
        </Box>
    );
}
