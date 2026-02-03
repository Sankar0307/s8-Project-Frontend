import './Table.css'

const Table = ({ columns, data, actions, searchPlaceholder, onSearch }) => {
  return (
    <div className="table-container">
      {searchPlaceholder && (
        <div className="table-header">
          <input
            type="text"
            className="table-search"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
      )}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.render ? column.render(row) : row[column.field]}
                    </td>
                  ))}
                  {actions && (
                    <td className="table-actions">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className={`btn btn-sm ${action.className || 'btn-primary'}`}
                          onClick={() => action.onClick(row)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
