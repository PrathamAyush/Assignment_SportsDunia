import React from 'react';

const Navbar = ({
    searchQuery,
    setSearchQuery,
    authorFilter,
    setAuthorFilter,
    dateFilter,
    setDateFilter,
    typeFilter,
    setTypeFilter
}) => {
    return (
        <div className="mb-6 p-4">
            {/* Global Search Bar */}
            <div className="grid grid-cols-6 gap-4">
                <div class="col-start-2 col-span-4 ...">
                    <input
                        type="text"
                        placeholder="Search articles"
                        className="p-2 border rounded w-5/6 align-center rounded-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Search by Author */}
                <div>
                    <input
                        type="text"
                        placeholder="Search by author..."
                        className="p-2 border rounded w-full rounded-full"
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                    />
                </div>

                {/* Search by Date */}
                <div>
                    <input
                        type="date"
                        className="p-2 border rounded w-full rounded-full"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>

                {/* Search by Type */}
                <div >
                    <input 
                        type="text"
                        placeholder="Search by type (news/blog)..."
                        className="p-2 border rounded w-full rounded-full"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
